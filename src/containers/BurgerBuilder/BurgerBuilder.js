import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import classes from './BurgerBulder.module.css';
import SelectionControls from '../../components/Burger/SelectionControls/SelectionControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Order/OrderSummary/OrderSummary';
import { OrderCompleted } from '../../components/Order/OrderSummary/OrderCompleted/OrderCompleted';
import * as actions from './../../store/actions';
import { INGREDIENT_PRICES } from '../../store/reducers/burgerBuilder';
import { Loading } from '../../components/UI/Loading/Loading';


export const BurgerBuilder = (props) => {

  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if(Object.keys(props.ings).length === 0) props.onInitIngredients();
  }, [])

  const openHandler = () => {
    setOpen(!open);
  };

  const completeHandler = () => {
    setOpen(false);
    setCompleted(!completed);
    props.onInitIngredients();
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/cart');
  };

    return (
      <article className={ classes.BurgerBuilder }>
        <Modal show={ open }
               close={ openHandler }
        >
          <OrderSummary
            ingredients={ props.ings }
            totalPrice={ props.price }
            purchasingHandler={ openHandler }
            purchaseContinueHandler={ completeHandler }
            modal={true}
          />
        </Modal>

        <OrderCompleted show={ completed } close={ completeHandler } />

        {Object.keys(props.ings).length === 0 || props.loading
          ? <Loading />
          : <>
        <div className={ classes.TitleContainer }>
          <div>
            {/*<p className={ classes.SubTitle }>React</p>*/ }
            <h2 className={ classes.Title }>Mystery Burger</h2>
            <p className={ classes.Description }>
              With Delicious Ancient Secret Sauce
            </p>
          </div>
        </div>

        <div className={ classes.Burger }>
          <Burger ingredients={ props.ings } />
        </div>

        <div className={ classes.SelectionControls }>
          <SelectionControls
            ingredientAdded={ props.onIngredientAdded }
            ingredientRemoved={ props.onIngredientRemoved }
            totalPrice={ props.price }
            ingredients={ props.ings }
            price={ props.ingsPrice }
            isAuth = { props.isAuth }
            purchasingHandler={ purchaseContinueHandler }
            fastOrder={ openHandler }
          />
        </div>
        </>}
      </article>
    );
};

// TODO 1. провести рефакторинг наименований переменных
// TODO 3. переместить всю авторизацию в .env / скачать firebase плагин

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    ingsPrice: INGREDIENT_PRICES,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);