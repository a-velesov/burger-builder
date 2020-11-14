import React, { Component } from 'react';
import './App.css';
import Layout from './components/UI/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Auth/Auth';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSign();
  }

  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path='/cart' component={ Cart } />
            <Route path='/orders' component={ Orders } />
            <Route path='/auth' component={ Auth } />
            <Route path='/logout' component={ Logout } />
            <Route path='/' exact component={ BurgerBuilder } />
          </Switch>
        </Layout>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSign: () => dispatch(actions.authChackState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
