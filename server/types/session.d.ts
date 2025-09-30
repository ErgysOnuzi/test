import 'express-session'

declare module 'express-session' {
  interface SessionData {
    adminAuthenticated?: boolean
    adminUser?: {
      email: string
      username: string
    } | null
  }
}