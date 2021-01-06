import React from 'react';
import classes from './Control.module.css';

interface PropsType {
    label: string,
    quantity: number,
    quantitySummary: any,
    added: (label: string) => void,
    removed: (label: string) => void,
    price: any,
}

const Control = ({
                     label,
                     quantity,
                     quantitySummary,
                     added,
                     removed,
                     price,
                 }: PropsType) => {

    const images = require.context('../../../../assets/ingredients-icon', true);
    const imgSrc = images(`./${label}.svg`).default;

    return (
        <div className={classes.Control}>
            <div className={classes.Selection}>
                <button
                    onClick={() => removed(label)}
                    disabled={quantity < 1}
                >
                    -
                </button>
                <p>{quantity}</p>
                <button
                    onClick={() => added(label)}
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
