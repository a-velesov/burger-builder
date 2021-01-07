import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../../../assets/title.png'
import cart from '../../../../assets/cart-icon.svg'
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";


const Header = () => {
    const isAuth = useSelector((state: RootState) => state.auth.token);

    return (
        <header className={classes.Header}>
            <div className={classes.HeaderContainer}>
                <NavLink to="/">
                    <img src={logo} alt="React Burger Builder" />
                </NavLink>
                <nav className={classes.Nav}>
                    {isAuth !== null ? <NavLink to="/orders">Orders</NavLink> : null}
                    <div className={classes.Cart}>
                        <NavLink to="/cart">
                            <span>Cart</span>
                            <img src={cart} alt="cart" />
                        </NavLink>
                    </div>
                    {isAuth !== null ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/auth">Sign in</NavLink>}
                </nav>
            </div>
        </header>
    )
}

export default Header;
