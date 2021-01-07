import React from 'react';
import classes from './OrderCompleted.module.css';
import { Modal } from '../../../UI/Modal/Modal';

interface PropsType {
    show: boolean,
    close: () => void,
}

const OrderCompleted = ({ show, close }: PropsType) => (
  <Modal show={show} close={close}>
    <div className={classes.Completed}>Your order is accepted</div>
    <div className={classes.Close} onClick={close} />
  </Modal>
);

export default OrderCompleted;
