import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header/Header';
import classes from './Layout.module.css';

const Layout = (props) => (
  <div className={classes.Layout}>
    <Header isAuth={props.isAuth} />
    <main className={classes.Content}>
      { props.children }
    </main>
  </div>
);

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
