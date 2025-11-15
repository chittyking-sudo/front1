import { Hono } from 'hono'
import type { CloudflareBindings, StudioWithTags } from '../types'
import {
  getAllStudios,
  getStudioBySlug,
  getAllTags,
  searchStudios,
  searchTags
} from '../db/queries'

const api = new Hono<{ Bindings: CloudflareBindings }>()

// ==========================================
// Studios API
// ==========================================

// GET /api/studios - Get all studios with filters
api.get('/studios', async (c) => {
  const db = c.env.DB
  
  const page = parseInt(c.req.query('page') || '1')
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 100)
  const offset = (page - 1) * limit
  
  const category = c.req.query('category')
  const tagsParam = c.req.query('tags')
  const tags = tagsParam ? tagsParam.split(',') : undefined
  const city = c.req.query('city')
  const stage = c.req.query('stage')
  const search = c.req.query('search')
  
  try {
    const studios = await getAllStudios(db, {
      limit,
      offset,
      category,
      tags,
      city,
      stage,
      search
    })
    
    // Get total count for pagination (simplified)
    const total = studios.length === limit ? (page * limit) + 1 : ((page - 1) * limit) + studios.length
    
    return c.json({
      success: true,
      data: studios,
      pagination: {
        page,
        limit,
        total,
        has_more: studios.length === limit
      }
    })
  } catch (error) {
    console.error('Error fetching studios:', error)
    return c.json({ success: false, error: 'Failed to fetch studios' }, 500)
  }
})

// GET /api/studios/:slug - Get studio by slug
api.get('/studios/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  
  try {
    const studio = await getStudioBySlug(db, slug)
    
    if (!studio) {
      return c.json({ success: false, error: 'Studio not found' }, 404)
    }
    
    // Increment view count
    await db.prepare(
      `UPDATE studios SET view_count = view_count + 1 WHERE id = ?`
    ).bind(studio.id).run()
    
    // Get similar studios (same tags)
    let similarStudios: any[] = []
    if (studio.tags.length > 0) {
      const tagSlugs = studio.tags.map(t => t.slug)
      const placeholders = tagSlugs.map(() => '?').join(',')
      
      const { results } = await db.prepare(
        `SELECT DISTINCT s.* FROM studios s
         JOIN studio_tags st ON s.id = st.studio_id
         JOIN tags t ON st.tag_id = t.id
         WHERE t.slug IN (${placeholders})
         AND s.id != ?
         AND s.status = 'published'
         LIMIT 6`
      ).bind(...tagSlugs, studio.id).all()
      
      similarStudios = results
    }
    
    return c.json({
      success: true,
      data: {
        ...studio,
        similar_studios: similarStudios
      }
    })
  } catch (error) {
    console.error('Error fetching studio:', error)
    return c.json({ success: false, error: 'Failed to fetch studio' }, 500)
  }
})

// ==========================================
// Tags API
// ==========================================

// GET /api/tags - Get all tags
api.get('/tags', async (c) => {
  const db = c.env.DB
  const category = c.req.query('category')
  
  try {
    let tags = await getAllTags(db)
    
    if (category) {
      tags = tags.filter(tag => tag.category === category)
    }
    
    return c.json({
      success: true,
      data: tags
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return c.json({ success: false, error: 'Failed to fetch tags' }, 500)
  }
})

// GET /api/tags/:slug/studios - Get studios by tag
api.get('/tags/:slug/studios', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  
  const page = parseInt(c.req.query('page') || '1')
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 100)
  const offset = (page - 1) * limit
  
  try {
    const studios = await getAllStudios(db, {
      limit,
      offset,
      tags: [slug]
    })
    
    return c.json({
      success: true,
      data: studios,
      pagination: {
        page,
        limit,
        has_more: studios.length === limit
      }
    })
  } catch (error) {
    console.error('Error fetching studios by tag:', error)
    return c.json({ success: false, error: 'Failed to fetch studios' }, 500)
  }
})

// ==========================================
// Search API
// ==========================================

// GET /api/search - Global search
api.get('/search', async (c) => {
  const db = c.env.DB
  const query = c.req.query('q')
  
  if (!query) {
    return c.json({ success: false, error: 'Query parameter "q" is required' }, 400)
  }
  
  const type = c.req.query('type') || 'all'
  const limit = Math.min(parseInt(c.req.query('limit') || '10'), 50)
  
  try {
    const results: any = {}
    
    if (type === 'all' || type === 'studios') {
      results.studios = await searchStudios(db, query, limit)
    }
    
    if (type === 'all' || type === 'tags') {
      results.tags = await searchTags(db, query, limit)
    }
    
    const totalResults = (results.studios?.length || 0) + (results.tags?.length || 0)
    
    return c.json({
      success: true,
      data: results,
      meta: {
        query,
        total_results: totalResults
      }
    })
  } catch (error) {
    console.error('Error searching:', error)
    return c.json({ success: false, error: 'Search failed' }, 500)
  }
})

export default api
