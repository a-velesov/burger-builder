import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import classes from './BurgerBulder.module.css';
import SelectionControls from '../../components/Burger/SelectionControls/SelectionControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import OrderCompleted from '../../components/Order/OrderSummary/OrderCompleted/OrderCompleted';
import {initIngredients, purchaseInit} from '../../store/actions';
import {INGREDIENT_PRICES} from '../../store/reducers/burgerBuilder';
import {Loading} from '../../components/UI/Loading/Loading';
import {useTypedSelector} from './../../store/rootReducer'
import {RouteComponentProps} from 'react-router-dom';

const BurgerBuilder: React.FunctionComponent<RouteComponentProps> = ({history}) => {
    const [open, setOpen] = useState(false);
    const [completed, setCompleted] = useState(false);

    const ings = useTypedSelector((state) => state.burgerBuilder.ingredients);
    const price = useTypedSelector((state) => state.burgerBuilder.totalPrice);
    const isAuth = useTypedSelector((state) => state.auth.token !== null);

    const dispatch = useDispatch();
    const onInitIngredients = () => dispatch(initIngredients());
    const onInitPurchase = () => dispatch(purchaseInit());

    useEffect(() => {
        if (Object.keys(ings).length === 0) onInitIngredients();
    }, []);

    const openHandler = () => {
        setOpen(!open);
    };

    const completeHandler = () => {
        setOpen(false);
        setCompleted(!completed);
        onInitIngredients();
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/cart');
    };

    return (
        <article className={classes.BurgerBuilder}>
            <Modal
                show={open}
                close={openHandler}
            >
                <OrderSummary
                    purchasingHandler={openHandler}
                    purchaseContinueHandler={completeHandler}
                />
            </Modal>

            <OrderCompleted show={completed} close={completeHandler} />

            {Object.keys(ings).length === 0
                ? <Loading />
                : (
                    <>
                        <div className={classes.TitleContainer}>
                            <div>
                                {/* <p className={ classes.SubTitle }>React</p> */}
                                <h2 className={classes.Title}>Mystery Burger</h2>
                                <p className={classes.Description}>
                                    With Delicious Ancient Secret Sauce
                                </p>
                            </div>
                        </div>

                        <div className={classes.Burger}>
                            <Burger />
                        </div>

                        <div className={classes.SelectionControls}>
                            <SelectionControls
                                totalPrice={price}
                                price={INGREDIENT_PRICES}
                                isAuth={isAuth}
                                purchasingHandler={purchaseContinueHandler}
                                fastOrder={openHandler}
                            />
                        </div>
                    </>
                )}
        </article>
    );
};

// TODO 1. провести рефакторинг наименований переменных
// TODO 3. переместить всю авторизацию в .env / скачать firebase плагин

export default BurgerBuilder;
