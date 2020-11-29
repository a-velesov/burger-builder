import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, [])

  return <Redirect to='/' />;
};

const mapDispatchtoProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};


export default connect(null, mapDispatchtoProps)(Logout);