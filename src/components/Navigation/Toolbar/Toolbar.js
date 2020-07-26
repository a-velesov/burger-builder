import React from 'react';
import classes from './Toolbar.module.css';
import { Logo } from '../../Logo/Logo';

export const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>

      </nav>
    </header>
  );
};
