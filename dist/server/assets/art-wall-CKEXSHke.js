const artWallTypes = [
  { value: "drawing", label: "Drawing / illustration", galleryLabel: "Art" },
  { value: "painting", label: "Painting", galleryLabel: "Art" },
  { value: "digital-art", label: "Digital art", galleryLabel: "Art" },
  { value: "photography", label: "Photography", galleryLabel: "Photography" },
  { value: "poetry", label: "Poetry", galleryLabel: "Poetry" },
  { value: "writing", label: "Creative writing", galleryLabel: "Writing" },
  { value: "mixed-media", label: "Mixed media", galleryLabel: "Mixed media" },
  { value: "other", label: "Other", galleryLabel: "Art" }
];
const artWallPrompt = {
  title: "What does belonging mean to you?",
  description: "Use it if it inspires you, or submit something completely different.",
  slug: "belonging"
};
function typeLabel(type) {
  return artWallTypes.find((item) => item.value === type)?.label || "Creative work";
}
function galleryType(type) {
  return artWallTypes.find((item) => item.value === type)?.galleryLabel || "Art";
}
export {
  artWallPrompt as a,
  artWallTypes as b,
  galleryType as g,
  typeLabel as t
};
