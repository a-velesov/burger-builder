import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Order from '../../components/Order/Order';
import {fetchOrders} from '../../store/actions';
import {Loading} from '../../components/UI/Loading/Loading';
import {useTypedSelector} from './../../store/rootReducer'


const Orders = () => {
    const dispatch = useDispatch();

    const orders = useTypedSelector((state) => state.order.orders);
    const loading = useTypedSelector((state) => state.order.loading);
    const userId = useTypedSelector((state) => state.auth.userId);
    const token = useTypedSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(fetchOrders(token, userId))
    }, []);

    let orderView = <Loading />;
    if (!loading) {
        orderView = (orders.reverse().map((order: any) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.totalPrice}
            />
        )));
    }
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Orders</h2>
            {orderView}
        </>
    );
};

export default Orders;
