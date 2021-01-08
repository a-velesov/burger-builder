import React from 'react';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';
import {useSelector} from "react-redux";
import {useTypedSelector} from './../../../store/rootReducer'

interface PropsType {
    purchasingHandler: () => void,
    purchaseContinueHandler: () => void,
}

interface Ing {
    [key: string]: any
}

const OrderSummary = ({
                          purchasingHandler, purchaseContinueHandler
                      }: PropsType) => {
    const images = require.context('../../../assets/ingredients-icon', true);

    const ingredients = useTypedSelector((state) => state.burgerBuilder.ingredients);
    const totalPrice = useTypedSelector((state) => state.burgerBuilder.totalPrice);

    type Evens = Partial<Record<keyof Ing, any>>;
    const evens: Evens = ingredients;

    const displayIngredients = (Object.keys(ingredients) as Array<keyof Ing>)
    .filter((el) => evens[el] > 0) // only show used ingredients
        .map((key) => (
            <li key={key}>
                <img
                    className={classes.Icon}
                    src={images(`./${key}.svg`).default}
                />
                <span className={classes.IngredientName}>{key}</span>
                {' '}
                {' x '}
                {evens[key]}
            </li>
        ));

    return (
        <>
            <div className={classes.Summary}>
                <h2>Order</h2>
                <p>A delicious burger with the following ingredients:</p>
                <ul className={classes.List}>{displayIngredients}</ul>
                <h3>
                    Total: $
                    {totalPrice}
                </h3>
            </div>

            <div className={classes.ButtonContainer}>
                <Button type="primary" action="Confirm" click={purchaseContinueHandler} />
                <Button type="secondary" action="Edit order" click={purchasingHandler} />
            </div>
        </>
    );
};

export default OrderSummary;