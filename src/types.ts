// Type definitions for Studio Network

export type CloudflareBindings = {
  DB: D1Database
}

export type Studio = {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  category: string | null
  city: string | null
  stage: string | null
  cover_image_url: string | null
  links: string
  status: string
  owner_id: string | null
  claimed_at: string | null
  view_count: number
  favorite_count: number
  like_count: number
}

export type Tag = {
  id: string
  created_at: string
  name: string
  slug: string
  description: string | null
  category: string
  color: string
  icon: string
  usage_count: number
  status: string
}

export type StudioTag = {
  id: string
  studio_id: string
  tag_id: string
  created_at: string
}

export type Image = {
  id: string
  created_at: string
  studio_id: string
  url: string
  thumbnail_url: string | null
  alt_text: string | null
  width: number | null
  height: number | null
  file_size: number | null
  mime_type: string | null
  sort_order: number
  like_count: number
  status: string
  image_type: string | null  // 'product_concept' | 'timeline' | 'gallery'
}

export type ProductConcept = {
  id: string
  studio_id: string
  title: string
  description: string | null
  image_url: string
  status: string  // '概念设计' | '原型制作' | '测试阶段' | '已发布'
  sort_order: number
  created_at: string
}

export type TimelineEvent = {
  id: string
  studio_id: string
  date: string  // YYYY-MM format
  title: string
  description: string | null
  image_url: string | null
  milestone: boolean
  sort_order: number
  created_at: string
}

// Extended types for API responses
export type StudioWithTags = Studio & {
  tags: Tag[]
  images?: Image[]
  productConcepts?: ProductConcept[]
  timelineEvents?: TimelineEvent[]
}

export type TagWithCount = Tag & {
  studio_count?: number
}
