import React from 'react';
import classes from './Backdrop.module.css';

export const Backdrop = ({ show, click }) =>  show ? <div className={ classes.Backdrop } onClick={ click }/> : null;
