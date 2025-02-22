import { createContext, useContext, useState, useMemo } from 'react'
import { Account } from '../models/Account'
import { httpGet, httpPost } from '../utils/utils'

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: async () => false,
    logout: () => {},
    get_current_user: async () => {},
    isLoading: true
  });

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (email, password) => {
    const data = { email: email, password: password }
    const response = await httpPost(`${import.meta.env.VITE_API_URL}/login/`, data)

    try {
      if (response.ok) {
        const userData = await response.json()
        
        const userId = userData._id
        
        const user = new Account(userId, userData.email, userData.username,
            userData.firstName, userData.lastName
         )
        setUser(user)
        setIsAuthenticated(true)

        // // Immediately fetch current user to ensure we have the latest data
        await get_current_user()
        return true
      }
      else {
        setUser(null)
        setIsAuthenticated(false)
        return false
      }
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw new Error(`${error}`)
    }
  }

  const logout = async () => {
    await httpGet(`${import.meta.env.VITE_API_URL}/logout/`)
    setIsAuthenticated(false)
    setUser(null)
  }

  const get_current_user = async () => {
    const response = await httpGet(`${import.meta.env.VITE_API_URL}/current/`)
    setIsLoading(true)

    try {
      if (response.ok) {
        const userData = await response.json()
        
        const userId = userData.id
        
        const user = new Account(userId, userData.email, userData.username,
            userData.firstName, userData.lastName
         )

        setUser(user)
        setIsAuthenticated(true)
      }
      else {
        setUser(null)
        setIsAuthenticated(false)
      }
   } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw new Error(`${error}`)
   }
    finally {
        setIsLoading(false)
    }
  }

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    get_current_user,
    isLoading
  }), [isAuthenticated, user, isLoading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 