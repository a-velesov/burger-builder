import React, { useEffect } from 'react';
import { Order } from '../../components/Order/Order';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Loading } from '../../components/UI/Loading/Loading';

const Orders = () => {

  const dispatch = useDispatch();
  const onFetchOrders = (token, userId) => dispatch(actions.fetchOrders(token, userId));

  const orders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);
  const userId = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [])

  console.log(orders, 'orders');

    let orderView = <Loading />;
    if(!loading) {
      orderView = (orders.reverse().map(order => (
        <Order
          key={ order.id }
          ingredients={ order.ingredients }
          price={ order.totalPrice }
        />)));
    }
    return (
      <>
        <h2 style={ { textAlign: 'center' } }>Orders</h2>
        { orderView }
      </>
    );
}

export default Orders;