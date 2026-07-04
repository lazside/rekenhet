/**
 * RSS Feed — /feed.xml
 *
 * Biedt een RSS 2.0 feed van het rekenhet.nl nieuwsblog.
 * Dit helpt bij:
 *   1. Snellere indexatie van nieuwe artikelen door Google
 *   2. Google Discover en Google News (als relevant)
 *   3. Abonnees via RSS-readers
 *   4. Interne linkbuilding signalen
 */

import { getAllNews } from "@/data/news";
import { SITE_URL } from "@/lib/seo/title-builder";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toUTCString();
}

export async function GET() {
  const articles = getAllNews();
  const now = new Date().toUTCString();

  const items = articles.map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/nieuws/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/nieuws/${article.slug}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${formatRssDate(article.date)}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <source url="${SITE_URL}/feed.xml">Rekenhet.nl Nieuws</source>
    </item>
  `).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Rekenhet.nl — Financieel Nieuws &amp; Blogs</title>
    <link>${SITE_URL}/nieuws</link>
    <description>Blijf op de hoogte van het laatste financiële nieuws: Prinsjesdag, belastingplan, AOW, minimumloon, toeslagen en meer.</description>
    <language>nl</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-default.svg</url>
      <title>Rekenhet.nl</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
