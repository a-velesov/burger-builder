import React from 'react';
import { Header } from './Header/Header';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Header isAuth={props.isAuth} />
      <main className={ classes.Content }>
        { props.children }
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);