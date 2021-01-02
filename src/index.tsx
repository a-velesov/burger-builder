import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware, combineReducers, createStore, compose,
} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/order';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  auth: authReducer,
  order: orderReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
