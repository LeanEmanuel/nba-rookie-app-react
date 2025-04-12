import type React from "react"
import {useState} from "react"
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonLoading,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    useIonToast,
} from "@ionic/react"
import {useHistory} from "react-router"
import {useAuth} from "../hooks/useAuth"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [busy, setBusy] = useState(false)
    const {login} = useAuth()
    const history = useHistory()
    const [presentToast] = useIonToast()

    /**
     * Login screen for NBA Rookie App.
     * Allows the user to log in with email and password using Firebase Auth.
     * Shows toast messages for validation and errors.
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            presentToast({
                message: "Por favor, introduce email y contraseña",
                duration: 3000,
                color: "warning",
            })
            return
        }

        try {
            setBusy(true)
            await login(email, password)
            history.push("/tabs/home")
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Error al iniciar sesión"

            await presentToast({
                message,
                duration: 3000,
                color: "danger",
            })
        } finally {
            setBusy(false)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>NBA Rookie App - Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Iniciar Sesión</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={handleLogin}>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value || "")}
                                          required/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Contraseña</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value || "")}
                                    required
                                />
                            </IonItem>
                            <IonButton expand="block" type="submit" className="ion-margin-top">
                                Iniciar Sesión
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
                <IonLoading isOpen={busy} message="Iniciando sesión..."/>
            </IonContent>
        </IonPage>
    )
}

export default Login