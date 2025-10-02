import express from 'express'
import { dbPromise } from '../db'
import { sql } from 'drizzle-orm'

const router = express.Router()

// GET /api/health - Basic health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// GET /api/ready - Database and storage readiness check
router.get('/ready', async (req, res) => {
  const readiness: { db: string; storage?: string; error?: string } = { db: 'fail' }
  
  try {
    const db = await dbPromise
    // Test database connection
    await db.execute(sql`SELECT 1`)
    readiness.db = 'ok'
    
    // Test storage when configured
    const hasStorageConfig = process.env.STORAGE_ENDPOINT && 
                             process.env.STORAGE_ACCESS_KEY && 
                             process.env.STORAGE_SECRET_KEY && 
                             process.env.STORAGE_BUCKET
    
    if (hasStorageConfig) {
      // TODO: Implement storage HEAD check when storage is configured
      readiness.storage = 'ok'  // Placeholder for now
    }
    
    if (readiness.db === 'ok') {
      res.json(readiness)
    } else {
      res.status(500).json(readiness)
    }
  } catch (error) {
    readiness.error = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Readiness check failed:', error)
    res.status(500).json(readiness)
  }
})

// GET /api/version - Build information
router.get('/version', (req, res) => {
  // In a real build process, these would be baked in at build time
  // For now, using fallback values
  const version = {
    git: process.env.GIT_SHA || 'dev-build',
    builtAt: process.env.BUILD_TIMESTAMP || new Date().toISOString()
  }
  
  res.json(version)
})

export default router