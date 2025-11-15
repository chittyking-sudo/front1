// Database query helpers
import type { Studio, Tag, Image, StudioWithTags } from '../types'

// ==========================================
// Studios Queries
// ==========================================

export async function getAllStudios(
  db: D1Database,
  options: {
    limit?: number
    offset?: number
    category?: string
    tags?: string[]
    city?: string
    stage?: string
    search?: string
  } = {}
): Promise<Studio[]> {
  const { limit = 20, offset = 0, category, tags, city, stage, search } = options
  
  let sql = `SELECT * FROM studios WHERE status = 'published'`
  const params: any[] = []
  
  if (category) {
    sql += ` AND category = ?`
    params.push(category)
  }
  
  if (city) {
    sql += ` AND city = ?`
    params.push(city)
  }
  
  if (stage) {
    sql += ` AND stage = ?`
    params.push(stage)
  }
  
  if (search) {
    sql += ` AND (name LIKE ? OR tagline LIKE ? OR description LIKE ?)`
    const searchPattern = `%${search}%`
    params.push(searchPattern, searchPattern, searchPattern)
  }
  
  if (tags && tags.length > 0) {
    sql += ` AND id IN (
      SELECT studio_id FROM studio_tags 
      WHERE tag_id IN (SELECT id FROM tags WHERE slug IN (${tags.map(() => '?').join(',')}))
      GROUP BY studio_id
      HAVING COUNT(DISTINCT tag_id) = ?
    )`
    params.push(...tags, tags.length)
  }
  
  sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
  params.push(limit, offset)
  
  const { results } = await db.prepare(sql).bind(...params).all()
  return results as Studio[]
}

export async function getStudioBySlug(
  db: D1Database,
  slug: string
): Promise<StudioWithTags | null> {
  // Get studio
  const studio = await db.prepare(
    `SELECT * FROM studios WHERE slug = ? AND status = 'published'`
  ).bind(slug).first() as Studio | null
  
  if (!studio) return null
  
  // Get tags
  const { results: tags } = await db.prepare(
    `SELECT t.* FROM tags t
     JOIN studio_tags st ON t.id = st.tag_id
     WHERE st.studio_id = ?`
  ).bind(studio.id).all()
  
  // Get images
  const { results: images } = await db.prepare(
    `SELECT * FROM images WHERE studio_id = ? ORDER BY sort_order`
  ).bind(studio.id).all()
  
  return {
    ...studio,
    tags: tags as Tag[],
    images: images as Image[]
  }
}

export async function createStudio(
  db: D1Database,
  data: {
    name: string
    slug: string
    tagline?: string
    description?: string
    category?: string
    city?: string
    stage?: string
    cover_image_url?: string
    links?: string
  }
): Promise<string> {
  const result = await db.prepare(
    `INSERT INTO studios (name, slug, tagline, description, category, city, stage, cover_image_url, links)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     RETURNING id`
  ).bind(
    data.name,
    data.slug,
    data.tagline || null,
    data.description || null,
    data.category || null,
    data.city || null,
    data.stage || null,
    data.cover_image_url || null,
    data.links || '[]'
  ).first() as { id: string }
  
  return result.id
}

export async function updateStudio(
  db: D1Database,
  id: string,
  data: Partial<Studio>
): Promise<void> {
  const fields: string[] = []
  const params: any[] = []
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id' && key !== 'created_at') {
      fields.push(`${key} = ?`)
      params.push(value)
    }
  })
  
  if (fields.length === 0) return
  
  fields.push('updated_at = CURRENT_TIMESTAMP')
  params.push(id)
  
  await db.prepare(
    `UPDATE studios SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...params).run()
}

export async function deleteStudio(db: D1Database, id: string): Promise<void> {
  await db.prepare(`UPDATE studios SET status = 'archived' WHERE id = ?`).bind(id).run()
}

// ==========================================
// Tags Queries
// ==========================================

export async function getAllTags(db: D1Database): Promise<Tag[]> {
  const { results } = await db.prepare(
    `SELECT * FROM tags WHERE status = 'active' ORDER BY usage_count DESC, name`
  ).all()
  return results as Tag[]
}

export async function getTagBySlug(db: D1Database, slug: string): Promise<Tag | null> {
  return await db.prepare(
    `SELECT * FROM tags WHERE slug = ? AND status = 'active'`
  ).bind(slug).first() as Tag | null
}

export async function updateTagUsageCount(db: D1Database, tagId: string): Promise<void> {
  await db.prepare(
    `UPDATE tags SET usage_count = (
      SELECT COUNT(*) FROM studio_tags WHERE tag_id = ?
    ) WHERE id = ?`
  ).bind(tagId, tagId).run()
}

// ==========================================
// Studio Tags Queries
// ==========================================

export async function addStudioTag(
  db: D1Database,
  studioId: string,
  tagId: string
): Promise<void> {
  await db.prepare(
    `INSERT OR IGNORE INTO studio_tags (studio_id, tag_id) VALUES (?, ?)`
  ).bind(studioId, tagId).run()
  
  await updateTagUsageCount(db, tagId)
}

export async function removeStudioTag(
  db: D1Database,
  studioId: string,
  tagId: string
): Promise<void> {
  await db.prepare(
    `DELETE FROM studio_tags WHERE studio_id = ? AND tag_id = ?`
  ).bind(studioId, tagId).run()
  
  await updateTagUsageCount(db, tagId)
}

export async function setStudioTags(
  db: D1Database,
  studioId: string,
  tagSlugs: string[]
): Promise<void> {
  // Remove all existing tags
  await db.prepare(`DELETE FROM studio_tags WHERE studio_id = ?`).bind(studioId).run()
  
  // Add new tags
  if (tagSlugs.length > 0) {
    const placeholders = tagSlugs.map(() => '?').join(',')
    const { results: tags } = await db.prepare(
      `SELECT id FROM tags WHERE slug IN (${placeholders})`
    ).bind(...tagSlugs).all()
    
    for (const tag of tags as { id: string }[]) {
      await addStudioTag(db, studioId, tag.id)
    }
  }
}

// ==========================================
// Images Queries
// ==========================================

export async function addImage(
  db: D1Database,
  data: {
    studio_id: string
    url: string
    thumbnail_url?: string
    alt_text?: string
    sort_order?: number
  }
): Promise<string> {
  const result = await db.prepare(
    `INSERT INTO images (studio_id, url, thumbnail_url, alt_text, sort_order)
     VALUES (?, ?, ?, ?, ?)
     RETURNING id`
  ).bind(
    data.studio_id,
    data.url,
    data.thumbnail_url || null,
    data.alt_text || null,
    data.sort_order || 0
  ).first() as { id: string }
  
  return result.id
}

export async function deleteImage(db: D1Database, id: string): Promise<void> {
  await db.prepare(`DELETE FROM images WHERE id = ?`).bind(id).run()
}

// ==========================================
// Search Queries
// ==========================================

export async function searchStudios(
  db: D1Database,
  query: string,
  limit: number = 10
): Promise<Studio[]> {
  const searchPattern = `%${query}%`
  const { results } = await db.prepare(
    `SELECT * FROM studios 
     WHERE status = 'published' 
     AND (name LIKE ? OR tagline LIKE ? OR description LIKE ?)
     ORDER BY 
       CASE 
         WHEN name LIKE ? THEN 1
         WHEN tagline LIKE ? THEN 2
         ELSE 3
       END,
       created_at DESC
     LIMIT ?`
  ).bind(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, limit).all()
  
  return results as Studio[]
}

export async function searchTags(
  db: D1Database,
  query: string,
  limit: number = 10
): Promise<Tag[]> {
  const searchPattern = `%${query}%`
  const { results } = await db.prepare(
    `SELECT * FROM tags 
     WHERE status = 'active' 
     AND (name LIKE ? OR description LIKE ?)
     ORDER BY usage_count DESC
     LIMIT ?`
  ).bind(searchPattern, searchPattern, limit).all()
  
  return results as Tag[]
}
