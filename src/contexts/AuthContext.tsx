import type React from "react"
import { createContext, useContext } from "react"
import { useAuth as useAuthHook } from "../hooks/useAuth"

/**
 * AuthContext stores the authentication state returned from useAuthHook.
 */
const AuthContext = createContext<ReturnType<typeof useAuthHook> | null>(null)

/**
 * AuthProvider wraps the application and provides access
 * to the authentication state via context.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuthHook()

    // Only render children when auth loading is finished
    return <AuthContext.Provider value={auth}>{!auth.loading && children}</AuthContext.Provider>
}

/**
 * Custom hook to access authentication state.
 * Throws an error if used outside of AuthProvider.
 */
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}