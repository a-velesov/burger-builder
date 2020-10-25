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
            <a href='/auth'>Sign In</a>
            <div className={classes.Cart}>
              <a href='/cart'>
              <span>Cart</span>
                <img src={ require('../../../../assets/cart-icon.svg') } alt="cart" />
              </a>
            </div>
          </nav>
        </div>
      </header>
  );
};
