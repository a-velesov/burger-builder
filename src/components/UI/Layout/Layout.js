import React from 'react';
import { Header } from './Header/Header';
import classes from './Layout.module.css'

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className={classes.Content}>
        { props.children }
      </main>
    </>
  )
}

export default Layout;