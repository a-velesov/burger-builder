import React, { Component } from 'react';
import { Burger } from '../../components/Burger/Burger';
import classes from './BurgerBulder.module.css';
import SelectionControls from '../../components/Burger/SelectionControls/SelectionControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../Axios/axios-orders'

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  onion: 0.25,
  pickle: 0.75,
  tomato: 0.5,
  egg: 0.75,
  bacon: 0.75,
  cheese: 0.5,
  protein: 3.75,
};

//set initial values
const initialIngredients = {
  lettuce: 1,
  onion: 1,
  pickle: 0,
  tomato: 0,
  egg: 0,
  bacon: 1,
  cheese: 1,
  protein: 1,
};

//calculate initial price based on prices and number of initial ingredients
const initialPrice = Object.keys(INGREDIENT_PRICES)
  .reduce((total, cur) => total += INGREDIENT_PRICES[cur] * initialIngredients[cur], 0);
const initialTotalIngredients = Object.values(initialIngredients).reduce(
  (sum, cur) => sum + cur,
);

//start component
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    //use ref to reset SelectionControls' states with reset button
    this.resetSelectionControls = React.createRef();
  }

  state = {
    ingredients: initialIngredients,
    totalIngredients: initialTotalIngredients,
    totalPrice: initialPrice,
    purchasable: false,
    purchasing: false,
  };

  //fn for disable add/remove buttons in SelectionControls
  adjustIngredientHandler = (type, action, fn) => {
    //create copy of original ingredient obj
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    //update quantity count
    const prevCount = this.state.ingredients[type];
    const updatedCount =
            action === 'add'
              ? prevCount + 1
              : prevCount > 0
              ? prevCount - 1
              : prevCount;
    updatedIngredients[type] = updatedCount;

    //update price
    const prevPrice = this.state.totalPrice;
    const updatedPrice =
            action === 'add'
              ? prevPrice + INGREDIENT_PRICES[type]
              : prevCount > 0
              ? prevPrice - INGREDIENT_PRICES[type]
              : prevPrice;

    //enable & disable buttons using checkIngredientsQuant in SelectionControls component
    fn(updatedIngredients);

    //update state
    this.setState({
      ingredients: updatedIngredients,
      totalIngredients: Object.values(updatedIngredients).reduce(
        (sum, cur) => sum + cur,
      ),
      totalPrice: updatedPrice,
    });
  };

  //reset button
  resetClickHandler = () => {
    //reset this component's state
    this.setState({
      ingredients: initialIngredients,
      totalIngredients: initialTotalIngredients,
      totalPrice: initialPrice,
    });

    //reset SelectionControls' states
    this.resetSelectionControls.current.resetStates();
  };

  purchasingHandler = () => {
    //toggle purchasing true/false
    this.setState({ purchasing: !this.state.purchasing });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex',
        shipping: {
          city: 'Moscow',
          street: 'Vavilova',
          house: '10'
        },
        email: 'test@test.ru'
      }
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <article className={ classes.BurgerBuilder }>
        <Modal show={ this.state.purchasing }
               purchasingHandler={ this.purchasingHandler }
        >
          <OrderSummary
            ingredients={ this.state.ingredients }
            totalPrice={ this.state.totalPrice }
            purchasingHandler={ this.purchasingHandler }
            purchaseContinueHandler={this.purchaseContinueHandler}
          />
        </Modal>
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
          <Burger ingredients={ this.state.ingredients } />
        </div>

        <div className={ classes.SelectionControls }>
          <SelectionControls
            totalPrice={ this.state.totalPrice }
            ingredients={ this.state.ingredients }
            totalIngredients={ this.state.totalIngredients }
            ref={ this.resetSelectionControls }
            adjustIngredientHandler={ this.adjustIngredientHandler }
            disabledAdd={ this.state.disabledAdd }
            disabledRemove={ this.state.disabledRemove }
            price={ INGREDIENT_PRICES }
            resetClickHandler={ this.resetClickHandler }
            purchasingHandler={ this.purchasingHandler }
          />
        </div>
      </article>
    );
  }
}

export default BurgerBuilder;