export type ArtWallType = "drawing" | "painting" | "digital-art" | "photography" | "poetry" | "writing" | "mixed-media" | "other"
export type ModerationStatus = "pending" | "approved" | "rejected" | "removed"

export const artWallTypes: { value: ArtWallType; label: string; galleryLabel: "Art" | "Photography" | "Poetry" | "Writing" | "Mixed media" }[] = [
  { value: "drawing", label: "Drawing / illustration", galleryLabel: "Art" },
  { value: "painting", label: "Painting", galleryLabel: "Art" },
  { value: "digital-art", label: "Digital art", galleryLabel: "Art" },
  { value: "photography", label: "Photography", galleryLabel: "Photography" },
  { value: "poetry", label: "Poetry", galleryLabel: "Poetry" },
  { value: "writing", label: "Creative writing", galleryLabel: "Writing" },
  { value: "mixed-media", label: "Mixed media", galleryLabel: "Mixed media" },
  { value: "other", label: "Other", galleryLabel: "Art" },
]

export const artWallPrompt = {
  title: "What does belonging mean to you?",
  description: "Use it if it inspires you, or submit something completely different.",
  slug: "belonging",
  active: true,
} as const

export interface ArtWallSubmission {
  slug: string
  title: string
  type: ArtWallType
  displayName: string | null
  isAnonymous: boolean
  description: string | null
  textContent: string | null
  imageUrl?: string | null
  altText?: string | null
  theme?: string | null
  contentNote?: string | null
  revealContent?: boolean
  featured: boolean
  publishedAt?: string | null
}

export function typeLabel(type: ArtWallType) {
  return artWallTypes.find((item) => item.value === type)?.label || "Creative work"
}

export function galleryType(type: ArtWallType) {
  return artWallTypes.find((item) => item.value === type)?.galleryLabel || "Art"
}
