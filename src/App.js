import React, { Component } from 'react';
import './App.css';
import Layout from './components/UI/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Cart from './containers/Cart/Cart';

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path='/cart' component={Cart} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default App;
