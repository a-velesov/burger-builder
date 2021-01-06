import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

export const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.logout());

  useEffect(() => {
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
