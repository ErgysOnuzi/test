import express from 'express'
import { dbPromise } from '../db'
import { sql } from 'drizzle-orm'
import { readFileSync } from 'fs'
import { join } from 'path'

const router = express.Router()

const getPackageVersion = () => {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
    )
    return packageJson.version || '1.0.0'
  } catch (error) {
    console.error('Error reading package.json:', error)
    return '1.0.0'
  }
}

router.get('/health', async (req, res) => {
  const healthData = {
    status: 'ok',
    ts: new Date().toISOString(),
    version: process.env.GIT_SHA || getPackageVersion(),
    buildTime: process.env.BUILD_TIMESTAMP || new Date().toISOString()
  }
  
  res.json(healthData)
})

router.get('/ready', async (req, res) => {
  let dbStatus = 'disconnected'
  
  try {
    const db = await dbPromise
    await db.execute(sql`SELECT 1`)
    dbStatus = 'connected'
    
    const readyData = {
      status: 'ready',
      ts: new Date().toISOString(),
      database: dbStatus,
      version: process.env.GIT_SHA || getPackageVersion()
    }
    
    res.json(readyData)
  } catch (error) {
    console.error('❌ Readiness check failed:', error)
    
    res.status(503).json({
      status: 'not_ready',
      ts: new Date().toISOString(),
      database: dbStatus,
      version: process.env.GIT_SHA || getPackageVersion()
    })
  }
})

export default router