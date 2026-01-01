import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...')
  const [user, setUser] = useState(null)

  useEffect(() => {
    testConnection()
    checkUser()
  }, [])

  const testConnection = async () => {
    try {
      // Test connection by checking auth status instead of querying table
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setConnectionStatus(`Error: ${error.message}`)
      } else {
        setConnectionStatus('✅ Connected successfully!')
      }
    } catch (err) {
      setConnectionStatus(`Connection failed: ${err.message}`)
    }
  }

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123'
    })
    
    if (error) {
      console.error('Sign up error:', error)
    } else {
      console.log('Sign up success:', data)
      checkUser()
    }
  }

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="space-y-4">
        <div>
          <strong>Connection Status:</strong> {connectionStatus}
        </div>
        
        <div>
          <strong>User:</strong> {user ? user.email : 'Not logged in'}
        </div>
        
        <button 
          onClick={signUp}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Sign Up
        </button>
      </div>
    </div>
  )
}