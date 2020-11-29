import React, { useEffect } from 'react';
import { Order } from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Loading } from '../../components/UI/Loading/Loading';

export const Orders = (props) => {

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, [])

    let orders = <Loading />;
    if(!props.loading) {
      orders = (props.orders.reverse().map(order => (
        <Order
          key={ order.id }
          ingredients={ order.ingredients }
          price={ order.totalPrice }
        />)));
    }
    return (
      <>
        <h2 style={ { textAlign: 'center' } }>Orders</h2>
        { orders }
      </>
    );
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Orders);