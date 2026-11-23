// Site build settings. Johannes: you should never need to edit this file.
import { load as yamlLoad } from "js-yaml";

export default function (eleventyConfig) {
  // Let content files be written in YAML (.yml)
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yamlLoad(contents));

  // Copy these folders/files to the website unchanged
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // "A, B and C"
  eleventyConfig.addFilter("andList", (arr = []) => {
    if (arr.length <= 1) return arr.join("");
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
  });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));

  // Main link for a paper title: journal article first, then arXiv, SSRN, pdf
  eleventyConfig.addFilter("mainLink", (links = {}) =>
    links.article || links.arxiv || links.ssrn || links.pdf || null
  );

  eleventyConfig.addFilter("byStatus", (pubs, status) => pubs.filter((p) => p.status === status));
  eleventyConfig.addFilter("featured", (pubs) => pubs.filter((p) => p.featured));

  // Group published papers by year, newest first
  eleventyConfig.addFilter("groupByYear", (pubs) => {
    const groups = new Map();
    for (const p of pubs) {
      if (!groups.has(p.year)) groups.set(p.year, []);
      groups.get(p.year).push(p);
    }
    return [...groups.entries()].sort((a, b) => b[0] - a[0]).map(([year, items]) => ({ year, items }));
  });

  // Machine-readable list of papers (schema.org), for search engines and AI tools
  eleventyConfig.addFilter("pubSchema", (pubs, site) => {
    const me = { "@id": site.url + "/#person" };
    const items = pubs.map((p, i) => {
      const urls = Object.values(p.links || {});
      const work = {
        "@type": p.type === "chapter" ? "Chapter" : "ScholarlyArticle",
        name: p.title,
        headline: p.title,
        author: [me, ...(p.coauthors || []).map((n) => ({ "@type": "Person", name: n }))],
      };
      if (urls.length) { work.url = urls[0]; if (urls.length > 1) work.sameAs = urls.slice(1); }
      if (p.year) work.datePublished = String(p.year);
      if (p.journal && p.type !== "chapter") work.isPartOf = { "@type": "Periodical", name: p.journal };
      if (p.status === "preprint") work.creativeWorkStatus = "Preprint";
      if (p.status === "forthcoming") work.creativeWorkStatus = "Forthcoming";
      return { "@type": "ListItem", position: i + 1, item: work };
    });
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Publications and preprints of " + site.name,
      itemListElement: items,
    });
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
