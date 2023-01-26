import {Outlet, Navigate} from 'react-router-dom'

const PrivateLoginRegisterRoute = () => {
    let token = localStorage.getItem('access_token')
    return (
        token ? <Navigate to="/"/> : <Outlet/>
    );

};

export default PrivateLoginRegisterRoute;