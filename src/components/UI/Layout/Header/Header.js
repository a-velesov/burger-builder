import React from 'react';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={ classes.Header }>
        <div className={ classes.HeaderContainer }>
          <a href="/">
          <img src={ require('../../../../assets/title.png') } alt="React Burger Builder" />
          </a>
          <nav className={ classes.Nav }>
            <span>Sign In</span>
            <div className={classes.Cart}>
              <a href='/cart'>
              <img src={ require('../../../../assets/cart-icon.svg') } alt="cart" />
              <span>Cart</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
  );
};
