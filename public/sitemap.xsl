<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sitemap">

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:variable name="siteName" select="'Rekenhet.nl'"/>
<xsl:variable name="total" select="count(//sitemap:url)"/>

<xsl:template match="/">
<html lang="nl">
<head>
  <title>Sitemap — <xsl:value-of select="$siteName"/></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="light only"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      line-height: 1.6;
    }
    header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding: 2rem 1.5rem;
      text-align: center;
    }
    header h1 { font-size: 1.5rem; font-weight: 700; }
    header p { margin-top: .25rem; opacity: .85; font-size: .875rem; }
    .container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
    .stats {
      display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem;
    }
    .stat-card {
      background: white; border-radius: .75rem; padding: 1rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08); text-align: center;
    }
    .stat-card .num { font-size: 1.75rem; font-weight: 700; color: #2563eb; }
    .stat-card .lbl { font-size: .75rem; color: #64748b; text-transform: uppercase; letter-spacing: .05em; }
    table {
      width: 100%; border-collapse: separate; border-spacing: 0;
      background: white; border-radius: .75rem; overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
    th {
      background: #f1f5f9; text-align: left; padding: .75rem 1rem;
      font-size: .75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: .05em; color: #64748b;
    }
    td { padding: .625rem 1rem; border-top: 1px solid #f1f5f9; font-size: .875rem; }
    tr:hover td { background: #f8fafc; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .tag {
      display: inline-block; padding: .125rem .5rem; border-radius: 999px;
      font-size: .6875rem; font-weight: 500;
    }
    .tag-high { background: #dcfce7; color: #166534; }
    .tag-mid { background: #fef9c3; color: #854d0e; }
    .tag-low { background: #f1f5f9; color: #475569; }
    .freq { font-size: .75rem; color: #94a3b8; }
    footer {
      text-align: center; padding: 2rem; font-size: .75rem; color: #94a3b8;
    }
  </style>
</head>
<body>
  <header>
    <h1>🗺️ Sitemap — <xsl:value-of select="$siteName"/></h1>
    <p>Overzicht van alle pagina's op <xsl:value-of select="$siteName"/></p>
  </header>
  <div class="container">
    <div class="stats">
      <div class="stat-card">
        <div class="num"><xsl:value-of select="$total"/></div>
        <div class="lbl">Pagina's</div>
      </div>
      <div class="stat-card">
        <div class="num">
          <xsl:value-of select="count(//sitemap:url[sitemap:priority > 0.8])"/>
        </div>
        <div class="lbl">Hoge prioriteit</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Prioriteit</th>
          <th>Frequentie</th>
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates select="sitemap:urlset/sitemap:url">
          <xsl:sort select="sitemap:priority" order="descending"/>
        </xsl:apply-templates>
      </tbody>
    </table>
  </div>
  <footer>
    Gegenereerd door <xsl:value-of select="$siteName"/> · 
    <xsl:value-of select="$total"/> pagina's in sitemap
  </footer>
</body>
</html>
</xsl:template>

<xsl:template match="sitemap:url">
  <tr>
    <td>
      <a href="{sitemap:loc}" target="_blank" rel="noopener">
        <xsl:value-of select="sitemap:loc"/>
      </a>
    </td>
    <td>
      <xsl:variable name="p" select="number(sitemap:priority)"/>
      <span class="tag">
        <xsl:attribute name="class">
          <xsl:text>tag</xsl:text>
          <xsl:if test="$p >= 0.8"> tag-high</xsl:if>
          <xsl:if test="$p &lt; 0.8 and $p >= 0.6"> tag-mid</xsl:if>
          <xsl:if test="$p &lt; 0.6"> tag-low</xsl:if>
        </xsl:attribute>
        <xsl:value-of select="sitemap:priority"/>
      </span>
    </td>
    <td>
      <span class="freq"><xsl:value-of select="sitemap:changefreq"/></span>
    </td>
  </tr>
</xsl:template>

</xsl:stylesheet>
