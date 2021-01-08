import React from 'react';
import {useSelector} from 'react-redux';
import classes from './CartSummary.module.css';
import OrderSummary from '../Order/OrderSummary/OrderSummary';
import {useTypedSelector} from "../../store/rootReducer";

interface PropsType {
    checkoutContinueHandler: () => void,
    checkoutCancelHandler: () => void,
}

const CartSummary = (props: PropsType) => {

    const price = useTypedSelector((state) => state.burgerBuilder.totalPrice);

    return (
        <div className={classes.CartSummary}>
            <div>
                {
                    price === 0 ? <h2>Your basket is empty :(</h2>
                        : (
                            <OrderSummary
                                purchaseContinueHandler={props.checkoutContinueHandler}
                                purchasingHandler={props.checkoutCancelHandler}
                            />
                        )
                }
            </div>

        </div>
    )
}

export default CartSummary;