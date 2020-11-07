import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import classes from './BurgerBulder.module.css';
import SelectionControls from '../../components/Burger/SelectionControls/SelectionControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Order/OrderSummary/OrderSummary';
import { OrderCompleted } from '../../components/Order/OrderSummary/OrderCompleted/OrderCompleted';
import * as burgerBuilderActions from './../../store/actions';
import { INGREDIENT_PRICES } from '../../store/reducers/burgerBuilder';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    completed: false,
  };

  componentDidMount() {
    console.log(this.props.ings);
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

    const queryParams = [];
    for(let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }

    queryParams.push('price=' + this.props.price);

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/cart',
      search: '?' + queryString,
    });
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
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    ingsPrice: INGREDIENT_PRICES,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);