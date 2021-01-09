import * as actionTypes from './actionTypes';
import axios from '../../Axios/axios-orders';
import { initIngredients } from './burgerBuilder';
import { IObject } from '../../types';

export const purchaseBurgerSuccess = (id: string, orderData: IObject) => ({
  type: actionTypes.PURCHASE_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = (error: any) => ({
  type: actionTypes.PURCHASE_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_START,
});

export const purchaseBurger = (orderData: IObject, token: string) => (dispatch: any) => {
  dispatch(purchaseBurgerStart());
  axios.post(`/orders.json?auth=${token}`, orderData)
    .then((response) => {
      dispatch(initIngredients());
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((e) => {
      dispatch(purchaseBurgerFail(e));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = (orders: Array<string>) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error: any) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_INIT,
});

export const fetchOrders = (token: string, userId: string) => (dispatch: any) => {
  dispatch(fetchOrdersStart());
  /*  if (!token || !userId) {
    token = localStorage.getItem('token');
    userId = localStorage.getItem('userId');
  } */
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  axios.get(`/orders.json${queryParams}`)
    .then((res) => {
      const fetchedOrders = [];
      for (const key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((e) => {
      dispatch(fetchOrdersFail(e));
    });
};
