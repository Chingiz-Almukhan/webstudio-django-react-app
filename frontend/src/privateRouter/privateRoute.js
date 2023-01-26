import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    let token = localStorage.getItem('access_token')
    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    );

};

export default PrivateRoute;