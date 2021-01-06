import * as actionTypes from './actionTypes';
import axios from '../../Axios/axios-orders';

export const addIngredient = (name) => ({
  type: actionTypes.ADD_INGRIDIENTS,
  ingredientName: name,
});
export const removeIngredient = (name) => ({
  type: actionTypes.REMOVE_INGRIDIENTS,
  ingredientName: name,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGRIDIENTS,
  ingredients,
});

export const initIngredients = () => (dispatch) => {
  axios.get('https://burger-b6263.firebaseio.com/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((e) => {
      console.log(e);
    });
};
