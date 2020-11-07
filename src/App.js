import React, { Component } from 'react';
import './App.css';
import Layout from './components/UI/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Auth/Auth';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path='/cart' component={ Cart } />
            <Route path='/orders' component={ Orders } />
            <Route path='/auth' component={ Auth } />
            <Route path='/' exact component={ BurgerBuilder } />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default App;
