import {useState, useEffect} from "react"
import {auth, db} from "../firebase"
import {collection, getDocs, query} from "firebase/firestore"
import type {FavoritePlayer} from "../models/player"

/**
 * Custom hook to retrieve the user's list of favorite players from Firestore.
 *
 * @returns An object with:
 * - `favorites`: the list of favorite players
 * - `loading`: boolean indicating if the data is still loading
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoritePlayer[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        /**
         * Fetches the favorite players from Firestore for the authenticated user.
         */
        const fetchFavorites = async () => {
            const uid = auth.currentUser?.uid
            if (!uid) {
                setFavorites([])
                setLoading(false)
                return
            }

            try {
                const favoritesRef = collection(db, `users/${uid}/favorites`)
                const snapshot = await getDocs(query(favoritesRef))
                const data = snapshot.docs.map((doc) => doc.data() as FavoritePlayer)
                setFavorites(data)
            } catch (error) {
                console.error("Error fetching favorites:", error)
                setFavorites([])
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [auth.currentUser])

    return {favorites, loading}
}
