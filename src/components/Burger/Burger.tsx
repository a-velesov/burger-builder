import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import shadow from '../../assets/burger-shadow.svg';
import {useSelector} from "react-redux";
import {useTypedSelector} from "../../store/rootReducer";
import { Ing } from '../../types';

const Burger = () => {
    const ingredients = useTypedSelector((state) => state.burgerBuilder.ingredients);
    type Evens = Partial<Record<keyof Ing, any>>;
    const evens: Evens = ingredients;

    const transformedIngredient = Object.keys(ingredients)
        .map((igKey) => [...Array(evens[igKey])]
            .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />))
        .reduce((arr, el) => arr.concat(el), []);

    return (
        <div className={classes.WholeBurger}>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredient || <p className={classes.Info}>Please start adding ingredients</p>}
                <BurgerIngredient type="bread-bottom" />
            </div>
            {
                transformedIngredient.length <= 8
                    ? <img className={classes.Shadow} src={shadow} alt="burger shadow" />
                    : null
            }
        </div>
    );
};

export default withRouter(Burger);
