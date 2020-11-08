import React, { Component } from 'react';
import { Order } from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Loading } from '../../components/UI/Loading/Loading';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Loading />;
    if(!this.props.loading) {
      orders = (this.props.orders.reverse().map(order => (
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
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Orders);