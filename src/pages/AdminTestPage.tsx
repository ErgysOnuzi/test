import React, { useState, useEffect } from 'react'
import { adminAuth } from '@/lib/adminAuth'

export default function AdminTestPage() {
  const [authStatus, setAuthStatus] = useState<string>('Testing...')
  const [sessionData, setSessionData] = useState<any>(null)
  const [loginResult, setLoginResult] = useState<string>('')

  useEffect(() => {
    testAuth()
  }, [])

  const testAuth = async () => {
    try {
      // Test 1: Check current auth status
      const isAuth = await adminAuth.checkAuth()
      setAuthStatus(`Auth Check: ${isAuth ? 'AUTHENTICATED' : 'NOT AUTHENTICATED'}`)

      // Test 2: Get session data
      const response = await fetch('/api/admin/session', {
        credentials: 'include'
      })
      const sessionData = await response.json()
      setSessionData(sessionData)

    } catch (error) {
      setAuthStatus(`Error: ${error}`)
    }
  }

  const testLogin = async () => {
    try {
      const result = await adminAuth.login('ergysonuzi12@gmail.com', 'Xharie123')
      setLoginResult(`Login Result: ${JSON.stringify(result)}`)
      
      // Re-test auth after login
      setTimeout(testAuth, 1000)
    } catch (error) {
      setLoginResult(`Login Error: ${error}`)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Admin Authentication Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Status:</h3>
        <p>{authStatus}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Session Data:</h3>
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testLogin} style={{ padding: '10px 20px' }}>
          Test Login
        </button>
        <p>{loginResult}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testAuth} style={{ padding: '10px 20px' }}>
          Refresh Auth Status
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Quick Login Form:</h3>
        <form onSubmit={(e) => {
          e.preventDefault()
          testLogin()
        }}>
          <div>Email: ergysonuzi12@gmail.com</div>
          <div>Password: Xharie123</div>
          <button type="submit">Quick Login</button>
        </form>
      </div>
    </div>
  )
}