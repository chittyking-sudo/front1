import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { CloudflareBindings } from './types'
import { initDatabase } from './db/init'
import { renderer } from './renderer'
import apiRoutes from './routes/api'
import adminRoutes from './routes/admin'
import frontendRoutes from './routes/frontend'

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Initialize database on first request
app.use('*', async (c, next) => {
  const db = c.env.DB
  if (db) {
    try {
      await initDatabase(db)
    } catch (error) {
      console.error('Database initialization error:', error)
    }
  }
  await next()
})

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public/static directory
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer for HTML pages
app.use(renderer)

// Mount routes
app.route('/api', apiRoutes)
app.route('/admin', adminRoutes)
app.route('/', frontendRoutes)

export default app
