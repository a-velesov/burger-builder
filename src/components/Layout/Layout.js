import React from 'react';
import Aux from '../../hoc/auxComponent';
import classes from './Layout.module.css'

const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar</div>
      <main>
        { props.children }
      </main>
    </Aux>
  )
}

export default Layout;