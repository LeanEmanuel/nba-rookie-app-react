import type React from "react"
import { Redirect, Route, type RouteProps } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { currentUser, loading } = useAuth()

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute