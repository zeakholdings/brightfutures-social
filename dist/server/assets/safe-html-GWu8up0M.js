import sanitizeHtml from "sanitize-html";
function safeRichText(html) {
  return sanitizeHtml(html || "", { allowedTags: ["p", "br", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "blockquote", "a"], allowedAttributes: { a: ["href", "title", "target", "rel"] }, allowedSchemes: ["http", "https", "mailto"] });
}
export {
  safeRichText as s
};
