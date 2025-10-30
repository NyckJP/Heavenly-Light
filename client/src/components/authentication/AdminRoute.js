import React from "react"
import { Redirect, Route } from "react-router"

const AdminCheck = ({ component: Component, user, id }) => {
    if (user?.isAdmin)
        return <Component user={user} id={id} />
    if (user !== undefined)
        return <Redirect to="/user-sessions/new" />
    return null
}

const AdminRoute = ({ component, user, ...rest }) => {
    return (
        <Route render={(props) => <AdminCheck user={user} component={component} id={props.match.params.id} />}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default AdminRoute
