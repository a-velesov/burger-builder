import { combineReducers } from 'redux';
import burgerBuilderReducer from './reducers/burgerBuilder';
import authReducer from './reducers/auth';
import orderReducer from './reducers/order';

export const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;