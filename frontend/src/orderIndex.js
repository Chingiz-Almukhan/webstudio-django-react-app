import React, {useEffect, useState} from 'react';
import './App.css';
import axiosInstance from './axios';
import OrdersLoadingComponent from "./orders/ordersLoading";
import Orders from "./orders/orders";

function OrderApp() {
    const OrdersLoadingMain = OrdersLoadingComponent(Orders);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get('orders/').then((res) => {
            const allNews = res.data;
            setAppState({loading: false, posts: allNews});
            console.log(res.data);
        });
    }, [setAppState]);
    return (
        <div className="App">
            <h1 className="mt-5 mb-5">Последние новости</h1>
            <OrdersLoadingMain isLoading={appState.loading} posts={appState.posts}/>
        </div>
    );
}

export default OrderApp;