import React from 'react';
import classes from './Control.module.css';
import {useDispatch} from "react-redux";
import {addIngredient, removeIngredient} from '../../../../store/actions';

interface PropsType {
    label: string,
    quantity: number,
    quantitySummary: any,
    price: any,
}

const Control = ({
                     label,
                     quantity,
                     quantitySummary,
                     price,
                 }: PropsType) => {

    const images = require.context('../../../../assets/ingredients-icon', true);
    const imgSrc = images(`./${label}.svg`).default;

    const dispatch = useDispatch();

    return (
        <div className={classes.Control}>
            <div className={classes.Selection}>
                <button
                    onClick={() => dispatch(removeIngredient(label))}
                    disabled={quantity < 1}
                >
                    -
                </button>
                <p>{quantity}</p>
                <button
                    onClick={() => dispatch(addIngredient(label))}
                    disabled={quantity > 1 || quantitySummary > 9}
                >
                    +
                </button>
            </div>
            <img
                src={imgSrc}
                alt={label}
            />
            <p className={classes.Label}>{label}</p>
            <p className={classes.PriceTag}>
                +$
                {price[label]}
            </p>
        </div>
    )
};

export default Control;
