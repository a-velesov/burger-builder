import React, { Component } from 'react';
import { Button } from '../../components/UI/Button/Button';
import axios from '../../Axios/axios-orders';
import { Loading } from '../../components/UI/Loading';
import classes from './Checkout.module.css'

class Checkout extends Component {

  state = {
    name: '',
    shipping: {
      city: '',
      street: '',
      house: '',
    },
    email: '',
    loading: false,
  };

  orderSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Alex',
        shipping: {
          city: 'Moscow',
          street: 'Vavilova',
          house: '10',
        },
        email: 'test@test.ru',
      },
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          /*ingredients: initialIngredients,
           totalIngredients: initialTotalIngredients,
           totalPrice: initialPrice,
           purchasing: !this.state.purchasing,
           completed: true*/
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({
          loading: true,
        });
      });
  };

  render() {
    return (

      <div className={classes.Checkout}>
        <h2 className={classes.Title}>Checkout</h2>
        {
          this.state.loading
            ? <Loading />
            : <form className={classes.PersonalDataForm}>
                <input className={classes.PersonalData} type="text" name='name' placeholder='Name' />
                <input className={classes.PersonalData} type="email" name='email' placeholder='Email' />
                <input className={classes.PersonalData} type="text" name='city' placeholder='City' />
                <input className={classes.PersonalData} type="text" name='street' placeholder='Street' />
                <input className={classes.PersonalData} type="text" name='house' placeholder='House' />
                <Button action='Checkout' click={ this.orderSubmit } />
              </form>
        }
      </div>
    );
  }
}

export default Checkout;