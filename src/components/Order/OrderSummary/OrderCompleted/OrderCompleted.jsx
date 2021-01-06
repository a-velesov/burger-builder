import React from 'react';
import classes from './OrderCompleted.module.css';
import { Modal } from '../../../UI/Modal/Modal';

export const OrderCompleted = ({ show, close }) => (
  <Modal show={show} close={close}>
    <div className={classes.Completed}>Your order is accepted</div>
    <div className={classes.Close} onClick={close} />
  </Modal>
);
