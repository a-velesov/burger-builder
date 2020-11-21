import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = ({ isAuth }) => {
  return (
    <header className={ classes.Header }>
      <div className={ classes.HeaderContainer }>
        <a href="/">
          <img src={ require('../../../../assets/title.png') } alt="React Burger Builder" />
        </a>
        <nav className={ classes.Nav }>
          { isAuth ? <NavLink to={ '/orders' }>Orders</NavLink> : null }
          <div className={ classes.Cart }>
            <NavLink to={ '/cart' }>
              <span>Cart</span>
              <img src={ require('../../../../assets/cart-icon.svg') } alt="cart" />
            </NavLink>
          </div>
          { isAuth ? <NavLink to={ '/logout' }>Logout</NavLink> : <NavLink to={ '/auth' }>Sign in</NavLink> }
        </nav>
      </div>
    </header>
  );
};
