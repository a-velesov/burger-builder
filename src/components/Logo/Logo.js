import React from 'react';
import burgerLogo from "../../assets/images/burger-logo.png"
import classes from './Logo.module.css';

export const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Logo" />
  </div>
)
