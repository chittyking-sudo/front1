import { Hono } from 'hono'
import type { CloudflareBindings } from '../types'
import {
  getAllStudios,
  getAllTags,
  createStudio,
  updateStudio,
  deleteStudio,
  setStudioTags,
  addImage
} from '../db/queries'
import { AdminDashboard } from '../views/AdminDashboard'
import { AdminStudioForm } from '../views/AdminStudioForm'

const admin = new Hono<{ Bindings: CloudflareBindings }>()

// Admin dashboard (list all studios)
admin.get('/', async (c) => {
  const db = c.env.DB
  
  try {
    const { results: studios } = await db.prepare(
      `SELECT * FROM studios ORDER BY created_at DESC`
    ).all()
    
    const tags = await getAllTags(db)
    
    return c.render(
      <AdminDashboard 
        studios={studios as any[]}
        tags={tags}
      />
    )
  } catch (error) {
    console.error('Error loading admin dashboard:', error)
    return c.text('Error loading dashboard', 500)
  }
})

// Add new studio form
admin.get('/new', async (c) => {
  const db = c.env.DB
  const tags = await getAllTags(db)
  
  return c.render(
    <AdminStudioForm tags={tags} />
  )
})

// Edit studio form
admin.get('/edit/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  
  try {
    const studio = await db.prepare(
      `SELECT * FROM studios WHERE slug = ?`
    ).bind(slug).first()
    
    if (!studio) {
      return c.notFound()
    }
    
    // Get studio tags
    const { results: studioTags } = await db.prepare(
      `SELECT t.* FROM tags t
       JOIN studio_tags st ON t.id = st.tag_id
       WHERE st.studio_id = ?`
    ).bind((studio as any).id).all()
    
    const allTags = await getAllTags(db)
    
    return c.render(
      <AdminStudioForm 
        studio={studio as any}
        studioTags={studioTags as any[]}
        tags={allTags}
      />
    )
  } catch (error) {
    console.error('Error loading studio form:', error)
    return c.text('Error loading form', 500)
  }
})

// Create studio (POST)
admin.post('/api/studios', async (c) => {
  const db = c.env.DB
  
  try {
    const body = await c.req.json()
    const { tags, images, ...studioData } = body
    
    // Create studio
    const studioId = await createStudio(db, studioData)
    
    // Add tags
    if (tags && tags.length > 0) {
      await setStudioTags(db, studioId, tags)
    }
    
    // Add images
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await addImage(db, {
          studio_id: studioId,
          url: images[i].url,
          thumbnail_url: images[i].thumbnail_url,
          alt_text: images[i].alt_text,
          sort_order: i
        })
      }
    }
    
    return c.json({ success: true, studio_id: studioId })
  } catch (error) {
    console.error('Error creating studio:', error)
    return c.json({ success: false, error: 'Failed to create studio' }, 500)
  }
})

// Update studio (PUT)
admin.put('/api/studios/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const body = await c.req.json()
    const { tags, images, ...studioData } = body
    
    // Update studio
    await updateStudio(db, id, studioData)
    
    // Update tags
    if (tags) {
      await setStudioTags(db, id, tags)
    }
    
    // Update images (simplified: delete all and re-add)
    if (images) {
      await db.prepare(`DELETE FROM images WHERE studio_id = ?`).bind(id).run()
      
      for (let i = 0; i < images.length; i++) {
        await addImage(db, {
          studio_id: id,
          url: images[i].url,
          thumbnail_url: images[i].thumbnail_url,
          alt_text: images[i].alt_text,
          sort_order: i
        })
      }
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error updating studio:', error)
    return c.json({ success: false, error: 'Failed to update studio' }, 500)
  }
})

// Delete studio (DELETE)
admin.delete('/api/studios/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    await deleteStudio(db, id)
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting studio:', error)
    return c.json({ success: false, error: 'Failed to delete studio' }, 500)
  }
})

export default admin
