import React from 'react';
import classes from './Loading.module.css';
import loading from './../../assets/loading.gif'

export const Loading = () => (
  <img className={classes.Spinner} src={loading} alt="Loading" />
)