import React from 'react';

const Layout = (props) => {
  return (
    <>
      <div>Toolbar</div>
      <main>
        { props.children }
      </main>
    </>
  )
}

export default Layout;