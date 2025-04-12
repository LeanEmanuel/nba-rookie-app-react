import type React from "react"
import { Redirect, Route, type RouteProps } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

/**
 * Props for the PrivateRoute component.
 * Inherits all standard RouteProps and expects a `component` to render.
 */
interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
}

/**
 * PrivateRoute is a wrapper around Route that only allows
 * access to authenticated users.
 *
 * If the user is not logged in, it redirects to `/login`.
 */
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