import { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth"
import { auth } from "../firebase"

export function useAuth() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signup = async (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        return signOut(auth)
    }

    return {
        currentUser,
        login,
        signup,
        logout,
        loading,
    }
}