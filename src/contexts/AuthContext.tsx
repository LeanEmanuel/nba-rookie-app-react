import type React from "react"
import { createContext, useContext } from "react"
import { useAuth as useAuthHook } from "../hooks/useAuth"

const AuthContext = createContext<ReturnType<typeof useAuthHook> | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuthHook()

    return <AuthContext.Provider value={auth}>{!auth.loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}