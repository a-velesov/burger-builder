import React from 'react';
import classes from './Modal.module.css';
import { Backdrop } from '../Backdrop/Backdrop';

export const Modal = ({ children, show, purchasingHandler }) => {
  const animation = show ? classes.FadeIn : classes.FadeOut;
  const style = [ classes.Modal, animation ];

  return (
    <>
      <div className={ style.join(' ') }>{ children }</div>
      <Backdrop show={ show } click={ purchasingHandler } />
    </>
  );
};
