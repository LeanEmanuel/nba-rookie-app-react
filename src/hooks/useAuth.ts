import { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth"
import { auth } from "../firebase"

/**
 * Custom hook that manages authentication state using Firebase Auth.
 *
 * @returns An object with:
 * - `currentUser`: the currently authenticated user (or null)
 * - `login`: function to log in a user with email and password
 * - `signup`: function to create a new user account
 * - `logout`: function to log out the current user
 * - `loading`: boolean indicating whether auth state is still initializing
 */
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

    /**
     * Logs in a user using Firebase email/password auth.
     */
    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    /**
     * Signs up a new user using Firebase email/password auth.
     */
    const signup = async (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    /**
     * Logs out the currently signed-in user.
     */
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