import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Configuración de Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyArEeIJHpYx98sU2r175LvmhNcdlHub8I8",
    authDomain: "nba-rookie-app-2d984.firebaseapp.com",
    projectId: "nba-rookie-app-2d984",
    storageBucket: "nba-rookie-app-2d984.firebasestorage.app",
    messagingSenderId: "39767120543",
    appId: "1:39767120543:web:8090907edca7c84461e0aa",
    measurementId: "G-VSFEBM2J7B",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar instancias de Auth y Firestore
export const auth = getAuth(app)
export const db = getFirestore(app)