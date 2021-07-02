import React from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props:any) => {
    const user: UserState = useSelector((state: any) => state.user, shallowEqual);
    if(user.isLogged) {
        return <Route {...props} />;
    }
    return <Redirect to="/login"/>;
};

export default PrivateRoute;