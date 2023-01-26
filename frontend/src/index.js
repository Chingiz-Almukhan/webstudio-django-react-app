import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOM2 from "react-dom/client";
import './index.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import App from './App';
import Header from './header';
import Register from './auth/register';
import Login from './auth/login';
import Logout from './auth/logout';
import CreateOrder from "./orders/createOrder";
import Single from './news/newsSingle';
import PrivateRoute from "./privateRouter/privateRoute";
import PrivateLoginRegisterRoute from "./privateRouter/privateLoginRegister";
import CreateAnonymOrder from "./anonym/createAnonymOrder";
import Orders from "./orders/orders";
import orderApp from "./orderIndex";
import OrderApp from "./orderIndex";

const root = ReactDOM2.createRoot(document.getElementById("root"));
let token = localStorage.getItem('access_token')
root.render(
    <Router>
        <React.StrictMode>
            <Header/>
            <Routes>
                <Route exact path="/" element={<App/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/create/order" element={<CreateOrder/>}/>
                    <Route path="/orders/" element={<OrderApp/>}/>
                </Route>
                <Route element={<PrivateLoginRegisterRoute/>}>
                    <Route path="/create/anonym/order" element={<CreateAnonymOrder/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
                <Route path="/post/:slug" element={<Single/>}/>
            </Routes>
        </React.StrictMode>
    </Router>
);
