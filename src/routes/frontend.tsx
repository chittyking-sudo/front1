import { Hono } from 'hono'
import type { CloudflareBindings } from '../types'
import { getAllStudios, getAllTags, getStudioBySlug } from '../db/queries'
import { LandingPage } from '../views/LandingPage'
import { HomePage } from '../views/HomePage'
import { StudioDetailPage } from '../views/StudioDetailPage'
import { SearchPage } from '../views/SearchPage'
import { LoginPage } from '../views/LoginPage'
import { RegisterPage } from '../views/RegisterPage'

const frontend = new Hono<{ Bindings: CloudflareBindings }>()

// Landing page
frontend.get('/', async (c) => {
  const db = c.env.DB
  
  try {
    // Get concept tags for the ring
    const { results } = await db.prepare(
      `SELECT name, slug, color FROM tags WHERE category = 'concept' AND status = 'active' ORDER BY name`
    ).all()
    
    return c.html(<LandingPage tags={results} />)
  } catch (error) {
    console.error('Error loading landing page:', error)
    // Fallback with default tags
    const defaultTags = [
      { name: '极简主义', slug: 'minimalism', color: '#64748b' },
      { name: '侘寂美学', slug: 'wabi-sabi', color: '#92400e' },
      { name: '未来感', slug: 'futurism', color: '#7c3aed' },
      { name: '复古怀旧', slug: 'vintage', color: '#c2410c' },
      { name: '手工温度', slug: 'handmade', color: '#ea580c' },
      { name: '东方美学', slug: 'oriental', color: '#dc2626' },
      { name: '自然主义', slug: 'naturalism', color: '#16a34a' },
      { name: '工业风', slug: 'industrial', color: '#475569' }
    ]
    return c.html(<LandingPage tags={defaultTags} />)
  }
})

// Home page
frontend.get('/home', async (c) => {
  const db = c.env.DB
  
  try {
    // Get all tags
    const tags = await getAllTags(db)
    
    // Get initial studios (first 20)
    const studios = await getAllStudios(db, { limit: 20 })
    
    // Group tags by category
    const tagsByCategory = tags.reduce((acc, tag) => {
      if (!acc[tag.category]) acc[tag.category] = []
      acc[tag.category].push(tag)
      return acc
    }, {} as Record<string, typeof tags>)
    
    return c.render(
      <HomePage 
        tags={tagsByCategory} 
        studios={studios}
      />
    )
  } catch (error) {
    console.error('Error loading home page:', error)
    return c.text('Error loading page', 500)
  }
})

// Studio detail page
frontend.get('/studio/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  
  try {
    const studio = await getStudioBySlug(db, slug)
    
    if (!studio) {
      return c.notFound()
    }
    
    // Increment view count
    await db.prepare(
      `UPDATE studios SET view_count = view_count + 1 WHERE id = ?`
    ).bind(studio.id).run()
    
    // Get similar studios
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
    
    return c.render(
      <StudioDetailPage 
        studio={studio}
        similarStudios={similarStudios}
      />
    )
  } catch (error) {
    console.error('Error loading studio detail:', error)
    return c.text('Error loading page', 500)
  }
})

// Search/Filter page
frontend.get('/explore', async (c) => {
  const db = c.env.DB
  
  try {
    const category = c.req.query('category')
    const tagsParam = c.req.query('tags')
    const tags = tagsParam ? tagsParam.split(',') : undefined
    const city = c.req.query('city')
    const stage = c.req.query('stage')
    const search = c.req.query('search')
    const type = c.req.query('type') // concept or material
    
    const studios = await getAllStudios(db, {
      limit: 50,
      category,
      tags,
      city,
      stage,
      search
    })
    
    const allTags = await getAllTags(db)
    
    return c.render(
      <SearchPage 
        studios={studios}
        allTags={allTags}
        filters={{ category, tags, city, stage, search }}
        browseType={type}
      />
    )
  } catch (error) {
    console.error('Error loading explore page:', error)
    return c.text('Error loading page', 500)
  }
})

// Login page
frontend.get('/login', (c) => {
  const lang = c.req.query('lang') || 'zh'
  return c.render(<LoginPage lang={lang} />)
})

// Register page
frontend.get('/register', (c) => {
  const lang = c.req.query('lang') || 'zh'
  return c.render(<RegisterPage lang={lang} />)
})

export default frontend
