import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './components/UI/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Auth/Auth';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { authChackState } from './store/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authChackState());
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    </Layout>
  );
};

export default App;
