
import {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
} from "@ionic/react"
import { Redirect, Route } from "react-router-dom"
import { home, star } from "ionicons/icons"
import Home from "./Home"
import Favorites from "./Favorites"

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/tabs/home" component={Home} />
                <Route exact path="/tabs/favorites" component={Favorites} />
                <Route exact path="/tabs">
                    <Redirect to="/tabs/home" />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={home} />
                    <IonLabel>Inicio</IonLabel>
                </IonTabButton>
                <IonTabButton tab="favorites" href="/tabs/favorites">
                    <IonIcon icon={star} />
                    <IonLabel>Favoritos</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs
