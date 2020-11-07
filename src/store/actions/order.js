import * as actionTypes from './../actions/actionTypes';
import axios from '../../Axios/axios-orders';
import { initIngredients, resetIngredients } from './burgerBuilder';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error,
  };
};

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
        dispatch(resetIngredients());
        dispatch(initIngredients());
      })
      .catch(e => {
        dispatch(purchaseBurgerFail(e));
      });
  };
};


