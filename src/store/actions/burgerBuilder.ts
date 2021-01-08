import * as actionTypes from './actionTypes';
import axios from '../../Axios/axios-orders';

interface Ing {
  [key: string]: number
}

export const addIngredient = (name: string) => ({
  type: actionTypes.ADD_INGRIDIENTS,
  ingredientName: name,
});
export const removeIngredient = (name: string) => ({
  type: actionTypes.REMOVE_INGRIDIENTS,
  ingredientName: name,
});

export const setIngredients = (ingredients: Ing) => ({
  type: actionTypes.SET_INGRIDIENTS,
  ingredients,
});

export const initIngredients = () => (dispatch: any) => {
  axios.get('https://burger-b6263.firebaseio.com/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((e) => {
      console.log(e);
    });
};
