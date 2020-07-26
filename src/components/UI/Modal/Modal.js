import React from 'react';
import classes from './Modal.module.css';
import { Backdrop } from '../Backdrop/Backdrop';

export const Modal = (props) => {
  return (
    <>
      <Backdrop
        show={ props.show }
        clicked={props.modalClosed}
      />
      <div
        className={ classes.Modal }
        style={ {
          transform: props.show ? 'translateY(0)' : 'translateY(-180vh)',
          opacity: props.show ? '1' : '0',
        } }
      >
        { props.children }
      </div>
    </>
  );
};
