import type React from "react"
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText, IonButtons, IonButton, IonIcon,
} from "@ionic/react"
import {useFavorites} from "../hooks/usePlayerStorage"
import {logOutOutline} from "ionicons/icons";

/**
 * Favorites page that displays a list of the user's favorite NBA players.
 * Includes logout functionality and handles loading state.
 */
const Favorites: React.FC = () => {
    const {favorites, loading} = useFavorites()

    let handleLogout;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Favoritos</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading ? (
                    <IonText color="medium">
                        <p>Cargando favoritos...</p>
                    </IonText>
                ) : favorites.length === 0 ? (
                    <IonText color="medium">
                        <p>No tienes jugadores favoritos.</p>
                    </IonText>
                ) : (
                    favorites.map((player) => (
                        <IonCard key={player.id}>
                            <IonCardHeader>
                                <IonCardTitle>{player.first_name} {player.last_name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>Equipo: {player.team}</p>
                                <p>Posición: {player.position}</p>
                                {player.jersey_number && <p>Número: {player.jersey_number}</p>}
                                <p>País: {player.country}</p>
                                <p>Altura: {player.height} | Peso: {player.weight}</p>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}
            </IonContent>
        </IonPage>
    )
}

export default Favorites
