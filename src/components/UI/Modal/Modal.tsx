import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface PropsType {
    children?: any,
    show: boolean,
    close: React.MouseEventHandler<HTMLDivElement>,
}

const Modal = ({ children, show, close }: PropsType) => {
  const animation = show ? classes.FadeIn : classes.FadeOut;
  const style = [classes.Modal, animation];

  return (
    <>
      <div className={style.join(' ')}>{ children }</div>
      <Backdrop show={show} click={close} />
    </>
  );
};

export default Modal;