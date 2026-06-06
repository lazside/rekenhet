/**
 * validate-schema.js — JSON-LD Schema Validator
 *
 * Fetches critical pages, extracts <script type="application/ld+json">,
 * parses and validates mandatory structural keys.
 *
 * Usage:
 *   node scripts/validate-schema.js                    ← live production
 *   BASE_URL=http://localhost:3000 node scripts/validate-schema.js
 *
 * Exit code: 0 = all valid, 1 = any schema malformed.
 */

const https = require("https");
const http = require("http");
const TIMEOUT_MS = 15000;

// ─── Config ───────────────────────────────────────────────────

const BASE_URL = (process.env.BASE_URL || "https://rekenhet.nl").replace(/\/+$/, "");

// ─── Schema validation rules ──────────────────────────────────

var REQUIRED_TOP_LEVEL = [
  { key: "@context", expected: "https://schema.org" },
  { key: "@type" },
];

var TYPE_SPECIFIC = {};
TYPE_SPECIFIC["WebSite"] = [
  { key: "name" },
  { key: "url" },
];
TYPE_SPECIFIC["WebApplication"] = [
  { key: "name" },
  { key: "description" },
  { key: "applicationCategory" },
  { key: "offers" },
];
TYPE_SPECIFIC["FAQPage"] = [
  { key: "mainEntity", isArray: true, itemValidator: faqItemValidator },
];
TYPE_SPECIFIC["BreadcrumbList"] = [
  { key: "itemListElement", isArray: true, itemValidator: breadcrumbValidator },
];
TYPE_SPECIFIC["Organization"] = [
  { key: "name" },
  { key: "url" },
];
TYPE_SPECIFIC["WebPage"] = [
  { key: "name" },
  { key: "description" },
];

function faqItemValidator(item, idx, errors) {
  if (item["@type"] !== "Question") {
    errors.push("FAQPage.mainEntity[" + idx + "]: expected @type 'Question', got '" + (item["@type"] || "undefined") + "'");
  }
  if (!item.name || typeof item.name !== "string") {
    errors.push("FAQPage.mainEntity[" + idx + "]: missing or invalid 'name'");
  }
  var answer = item.acceptedAnswer;
  if (!answer || answer["@type"] !== "Answer") {
    errors.push("FAQPage.mainEntity[" + idx + "]: missing or invalid acceptedAnswer.@type 'Answer'");
  } else if (!answer.text || typeof answer.text !== "string") {
    errors.push("FAQPage.mainEntity[" + idx + "]: missing or invalid acceptedAnswer.text");
  }
}

function breadcrumbValidator(item, idx, errors) {
  if (item["@type"] !== "ListItem") {
    errors.push("BreadcrumbList.itemListElement[" + idx + "]: expected @type 'ListItem'");
  }
  if (typeof item.position !== "number") {
    errors.push("BreadcrumbList.itemListElement[" + idx + "]: missing or invalid 'position'");
  }
  if (!item.name) {
    errors.push("BreadcrumbList.itemListElement[" + idx + "]: missing 'name'");
  }
}

// ─── Parse & Validate ─────────────────────────────────────────

function extractJsonLd(html) {
  var results = [];
  var regex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  var match;

  while ((match = regex.exec(html)) !== null) {
    var raw = match[1].trim();
    if (!raw) continue;

    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        results.push({ json: parsed, raw: raw });
      }
    } catch (err) {
      console.error("\n  ✖ Failed to parse JSON-LD: " + err.message);
      console.error("  Raw snippet: " + raw.slice(0, 200));
      results.push({ json: {}, raw: raw });
    }
  }

  return results;
}

function validateSchema(obj, source) {
  var errors = [];
  var type = obj["@type"] || "unknown";

  // 1. Top-level checks
  for (var i = 0; i < REQUIRED_TOP_LEVEL.length; i++) {
    var rule = REQUIRED_TOP_LEVEL[i];
    var val = obj[rule.key];
    if (val === undefined || val === null) {
      errors.push("Missing required key \"" + rule.key + "\"");
    } else if (rule.expected !== undefined && val !== rule.expected) {
      errors.push("\"" + rule.key + "\" expected \"" + rule.expected + "\", got \"" + String(val) + "\"");
    }
  }

  // 2. Type-specific checks
  var typeRules = TYPE_SPECIFIC[type];
  if (typeRules) {
    for (var i = 0; i < typeRules.length; i++) {
      var rule = typeRules[i];
      var val = obj[rule.key];

      if (val === undefined || val === null) {
        errors.push("[" + type + "] Missing required key \"" + rule.key + "\"");
      } else if (rule.isArray) {
        if (!Array.isArray(val)) {
          errors.push("[" + type + "] \"" + rule.key + "\" expected array");
        } else if (rule.itemValidator) {
          for (var j = 0; j < val.length; j++) {
            if (typeof val[j] === "object" && val[j] !== null) {
              rule.itemValidator(val[j], j, errors);
            } else {
              errors.push("[" + type + "] " + rule.key + "[" + j + "] is not an object");
            }
          }
        }
      }
    }
  }

  if (errors.length === 0) return null;
  return { schema: type, source: source, errors: errors };
}

// ─── HTTP ─────────────────────────────────────────────────────

function fetchPage(url) {
  return new Promise(function (resolve, reject) {
    var parsed = new URL(url);
    var mod = parsed.protocol === "https:" ? https : http;

    mod.get(url, {
      headers: {
        "User-Agent": "Rekenhet-Schema-Validator/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
      timeout: TIMEOUT_MS,
    }, function (res) {
      if ((res.statusCode || 500) >= 400) {
        reject(new Error("HTTP " + res.statusCode + " for " + url));
        return;
      }
      var data = "";
      res.on("data", function (chunk) { data += chunk; });
      res.on("end", function () { resolve(data); });
    }).on("error", reject).on("timeout", function () {
      reject(new Error("Timeout fetching " + url));
    });
  });
}

// ─── Pages ────────────────────────────────────────────────────

var PAGES = [
  "/", "/calculators", "/contact", "/privacy", "/cookies",
  "/werk-en-inkomen", "/geld-en-verzekeringen", "/gezondheid", "/wiskunde",
  "/werk-en-inkomen/bruto-netto-salaris-calculator",
  "/ondernemen/btw-calculator",
  "/gezondheid/bmi-calculator",
  "/geld-en-verzekeringen/maximale-hypotheek",
  "/gezondheid/zwangerschap",
  "/calculators/vakantiegeld-berekenen",
  "/calculators/zwangerschap",
  "/bruto-netto/3500",
  "/omrekenen/cm-naar-m",
  "/kenteken-check",
  "/gemeentelijke-belastingen",
  "/lokaal/amsterdam",
  "/lokaal/rotterdam",
];

// ─── Main ─────────────────────────────────────────────────────

// ─── Local .next scanner (fallback when server isn't running) ──

var fs = require("fs");
var pathLib = require("path");

function scanLocalBuild() {
  var results = [];
  var baseDir = pathLib.join(__dirname, "..", ".next", "server", "app");

  if (!fs.existsSync(baseDir)) {
    return results;
  }

  var walk = function (dir) {
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var full = pathLib.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.name.endsWith(".html") && !e.name.includes("_not-found")) {
        results.push({ path: full.replace(baseDir, "").replace(/\\/g, "/"), html: fs.readFileSync(full, "utf8") });
      }
    }
  };

  walk(baseDir);
  return results;
}

async function main() {
  var startTime = Date.now();
  console.log("\n" +
    "╔════════════════════════════════════════════════╗\n" +
    "║    Rekenhet.nl — JSON-LD Schema Validator     ║\n" +
    "╚════════════════════════════════════════════════╝\n");

  var totalSchemas = 0;
  var validSchemas = 0;
  var allErrors = [];

  // Try local build files first (no server needed)
  var localFiles = scanLocalBuild();

  if (localFiles.length > 0) {
    console.log("  Scanning " + localFiles.length + " local built HTML files...\n");
    for (var idx = 0; idx < localFiles.length; idx++) {
      var lf = localFiles[idx];
      var schemas = extractJsonLd(lf.html);
      totalSchemas += schemas.length;

      if (schemas.length === 0) continue;

      var pageOk = true;
      for (var s = 0; s < schemas.length; s++) {
        var error = validateSchema(schemas[s].json, lf.path);
        if (error) {
          allErrors.push(error);
          pageOk = false;
        } else {
          validSchemas++;
        }
      }

      if (!pageOk) {
        console.log("  ❌ " + lf.path + " (" + schemas.length + " schemas)");
      }
    }
    console.log("  Local scan complete.\n");
  } else {
    // Fallback: fetch remote pages
    for (var idx = 0; idx < PAGES.length; idx++) {
      var path = PAGES[idx];
      var url = BASE_URL + path;
      process.stdout.write("  [" + (idx + 1) + "/" + PAGES.length + "] " + path + "... ");

      try {
        var html = await fetchPage(url);
        var schemas = extractJsonLd(html);
        totalSchemas += schemas.length;

        if (schemas.length === 0) {
          console.log("⚠ no JSON-LD found");
          continue;
        }

        var pageOk = true;
        for (var s = 0; s < schemas.length; s++) {
          var error = validateSchema(schemas[s].json, url);
          if (error) {
            allErrors.push(error);
            pageOk = false;
          } else {
            validSchemas++;
          }
        }

        console.log(pageOk ? "✅ " + schemas.length + " schema('s) valid" : "❌ error(s) found");
      } catch (err) {
        console.log("❌ fetch error: " + err.message);
      }
    }
  }

  var elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n" +
    "╔════════════════════════════════════════════════╗\n" +
    "║              VALIDATION REPORT                 ║\n" +
    "╚════════════════════════════════════════════════╝");
  console.log("  Pages scanned : " + (localFiles.length > 0 ? localFiles.length : PAGES.length));
  console.log("  Schemas found : " + totalSchemas);
  console.log("  Valid         : " + validSchemas);
  console.log("  ❌ Errors     : " + allErrors.length);
  console.log("  Time          : " + elapsed + "s");

  if (allErrors.length > 0) {
    console.log("\n── Schema Errors ──");
    for (var i = 0; i < allErrors.length; i++) {
      var err = allErrors[i];
      console.log("\n  Page: " + err.source);
      console.log("  Schema: " + err.schema);
      for (var j = 0; j < err.errors.length; j++) {
        console.log("    ❌ " + err.errors[j]);
      }
    }
    console.log("\n✖ Validation FAILED. Fix JSON-LD before deploying.\n");
    process.exit(1);
  }

  console.log("\n✓ All schemas valid. Ready for deployment.\n");
  process.exit(0);
}

main().catch(function (err) {
  console.error("\n✖ Script error: " + err.message);
  process.exit(1);
});
