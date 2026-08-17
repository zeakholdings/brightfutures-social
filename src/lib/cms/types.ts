export type CmsEventStatus =
  "draft" | "provisional" | "confirmed" | "cancelled" | "completed";
export type CmsEventCategory =
  | "social"
  | "coffee-connect"
  | "community"
  | "opportunity"
  | "voice-advocacy"
  | "wellbeing"
  | "trips"
  | "seasonal";
export type { Event } from "@/data/events";

export interface CmsEvent {
  id: string | number;
  title: string;
  slug: string;
  status: CmsEventStatus;
  academic_year: string;
  category: CmsEventCategory;
  start_date: string;
  end_date?: string | null;
  time_display?: string | null;
  location?: string | null;
  description?: string | null;
  body?: string | null;
  who_for?: string | null;
  cost_info?: string | null;
  contact_info?: string | null;
  registration_url?: string | null;
  featured?: boolean;
  cover_image?: string | null;
  cover_image_alt?: string | null;
  accessibility_info?: string | null;
  published_at?: string | null;
}

export interface Post {
  id: string | number;
  title: string;
  slug: string;
  status: "published";
  excerpt?: string | null;
  body?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  author_name?: string | null;
  category?:
    | "news"
    | "society"
    | "student-voice"
    | "opportunities"
    | "events"
    | "history"
    | "podcast"
    | null;
  published_at: string;
  featured?: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
}

export interface CommitteeMember {
  id: string | number;
  name: string;
  role: string;
  role_short?: string | null;
  bio?: string | null;
  portrait_original?: string | null;
  portrait_stylised?: string | null;
  portrait_alt?: string | null;
  // Legacy fields remain supported while existing CMS records are migrated.
  photo?: string | null;
  photo_alt?: string | null;
  email?: string | null;
  display_order?: number | null;
  academic_year?: string | null;
}
export interface SocialCard {
  id: string | number;
  image: string;
  image_alt: string;
  caption?: string | null;
  post_url?: string | null;
  display_order?: number | null;
  status: "draft" | "published";
}
export interface MemberHighlight {
  id: string | number;
  status: "published";
  display_name?: string | null;
  highlight_text: string;
  category?: string | null;
  term?: string | null;
  published_at: string;
  image?: string | null;
  image_alt?: string | null;
  display_order?: number | null;
}
export type CommunityActionStatus =
  | "heard"
  | "raised"
  | "in_progress"
  | "completed";
export interface CommunityAction {
  id: string | number;
  status: "published";
  title: string;
  theme?: string | null;
  what_members_said: string;
  what_brightfutures_did: string;
  current_status: CommunityActionStatus;
  public_update?: string | null;
  published_at: string;
  display_order?: number | null;
}
export type ResourceCategory =
  | "money-funding"
  | "university-support"
  | "life-after-university"
  // Retained so existing CMS records remain readable during migration.
  | "greenwich-support"
  | "accommodation"
  | "money"
  | "wellbeing"
  | "careers"
  | "opportunities"
  | "community";
export type ResourceReviewStatus = "active" | "needs-review" | "archived";
export type ResourceAudience =
  | "all-greenwich-students"
  | "care-experienced-students"
  | "care-leavers"
  | "estranged-students"
  | "care-experienced-and-estranged-students";
export interface Resource {
  id: string | number;
  title: string;
  description?: string | null;
  category: ResourceCategory;
  organisation?: string | null;
  url?: string | null;
  eligibility_note?: string | null;
  first_stop_guidance?: string | null;
  context_label?: string | null;
  last_reviewed?: string | null;
  source_url?: string | null;
  review_due?: string | null;
  resource_status?: ResourceReviewStatus | null;
  audience?: ResourceAudience[] | null;
  featured?: boolean;
  display_order?: number | null;
}
export interface SiteSettings {
  site_name: string;
  tagline: string;
  membership_url: string;
  instagram_url?: string | null;
  contact_email?: string | null;
  homepage_announcement?: string | null;
  homepage_announcement_url?: string | null;
  show_announcement?: boolean;
  default_seo_title: string;
  default_seo_description: string;
}
