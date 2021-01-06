import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

export const Header = ({ isAuth }) => (
  <header className={classes.Header}>
    <div className={classes.HeaderContainer}>
      <NavLink to="/">
        <img src={require('../../../../assets/title.png')} alt="React Burger Builder" />
      </NavLink>
      <nav className={classes.Nav}>
        { isAuth ? <NavLink to="/orders">Orders</NavLink> : null }
        <div className={classes.Cart}>
          <NavLink to="/cart">
            <span>Cart</span>
            <img src={require('../../../../assets/cart-icon.svg')} alt="cart" />
          </NavLink>
        </div>
        { isAuth ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/auth">Sign in</NavLink> }
      </nav>
    </div>
  </header>
);
