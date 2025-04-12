import type React from "react"
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
} from "@ionic/react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router"

const Home: React.FC = () => {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        try {
            await logout()
            history.push("/login")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>NBA Rookie App - Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Bienvenido a NBA Rookie App</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Hola, {currentUser?.email}!</p>
                        <p>
                            Esta aplicación te permite ver y gestionar tus jugadores favoritos de la NBA. Navega a la sección de
                            Favoritos para ver tu lista actual.
                        </p>
                        <IonButton expand="block" onClick={handleLogout} color="medium" className="ion-margin-top">
                            Cerrar Sesión
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Home