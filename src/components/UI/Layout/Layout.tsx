import React from 'react';
import Header from './Header/Header';
import classes from './Layout.module.css';

interface PropsType {
    children?: React.ReactNode,
}

const Layout = (props: PropsType) => (
    <div className={classes.Layout}>
        <Header />
        <main className={classes.Content}>
            {props.children}
        </main>
    </div>
);

export default Layout;
