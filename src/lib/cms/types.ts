export type CmsEventStatus = "draft" | "provisional" | "confirmed" | "cancelled" | "completed"
export type CmsEventCategory = "social" | "coffee-connect" | "community" | "opportunity" | "voice-advocacy" | "wellbeing" | "trips" | "seasonal"

export interface CmsEvent {
  id: string | number
  title: string
  slug: string
  status: CmsEventStatus
  academic_year: string
  category: CmsEventCategory
  start_date: string
  end_date?: string | null
  time_display?: string | null
  location?: string | null
  description?: string | null
  body?: string | null
  registration_url?: string | null
  featured?: boolean
  cover_image?: string | null
  cover_image_alt?: string | null
  accessibility_info?: string | null
  published_at?: string | null
}

export interface Post {
  id: string | number
  title: string
  slug: string
  status: "published"
  excerpt?: string | null
  body?: string | null
  featured_image?: string | null
  featured_image_alt?: string | null
  author_name?: string | null
  category?: "news" | "society" | "student-voice" | "opportunities" | "events" | null
  published_at: string
  featured?: boolean
  seo_title?: string | null
  seo_description?: string | null
}

export interface CommitteeMember { id: string | number; name: string; role: string; role_short?: string | null; bio?: string | null; photo?: string | null; photo_alt?: string | null; email?: string | null; display_order?: number | null; academic_year?: string | null }
export interface Resource { id: string | number; title: string; description?: string | null; category: string; organisation?: string | null; url?: string | null; featured?: boolean; display_order?: number | null }
export interface SiteSettings { site_name: string; tagline: string; membership_url: string; instagram_url?: string | null; contact_email?: string | null; homepage_announcement?: string | null; homepage_announcement_url?: string | null; show_announcement?: boolean; default_seo_title: string; default_seo_description: string }
