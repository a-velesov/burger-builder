import React from 'react';
import classes from './Backdrop.module.css';

interface PropsType {
    show: boolean,
    click: React.MouseEventHandler<HTMLDivElement>,
}

const Backdrop = ({ show, click }: PropsType) =>  show ? <div className={ classes.Backdrop } onClick={ click }/> : null;

export default Backdrop;
