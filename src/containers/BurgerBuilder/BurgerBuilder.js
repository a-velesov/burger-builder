import React, { Component } from 'react';
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

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    completed: false,
  };

  componentDidMount() {
    if(Object.keys(this.props.ings).length === 0) this.props.onInitIngredients();
  }

  purchasingHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  completeHandler = () => {
    this.setState({
      completed: !this.state.completed,
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/cart');
  };

  render() {

    return (
      <article className={ classes.BurgerBuilder }>
        <Modal show={ this.state.purchasing }
               close={ this.purchasingHandler }
        >
          <OrderSummary
            ingredients={ this.props.ings }
            totalPrice={ this.props.price }
            purchasingHandler={ this.purchasingHandler }
            purchaseContinueHandler={ this.completeHandler }
          />
        </Modal>

        <OrderCompleted show={ this.state.completed } close={ this.completeHandler } />

        {Object.keys(this.props.ings).length === 0 || this.props.loading
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
          <Burger ingredients={ this.props.ings } />
        </div>

        <div className={ classes.SelectionControls }>
          <SelectionControls
            ingredientAdded={ this.props.onIngredientAdded }
            ingredientRemoved={ this.props.onIngredientRemoved }
            totalPrice={ this.props.price }
            ingredients={ this.props.ings }
            price={ this.props.ingsPrice }
            purchasingHandler={ this.purchaseContinueHandler }
            fastOrder={ this.purchasingHandler }
          />
        </div>
        </>}
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    ingsPrice: INGREDIENT_PRICES,
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