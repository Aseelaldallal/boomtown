// React
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { BrowserRouter } from 'react-router-dom';
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import itemsReducer from './store/reducers/items';
import usersReducer from './store/reducers/users';
import itemAdderReducer from './store/reducers/itemAdder';
import authReducer from './store/reducers/auth';
// Components and Containers
import App from './App';
// Styling
import './index.css';
// Register Service Worker
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  items: itemsReducer,
  users: usersReducer,
  itemAdder: itemAdderReducer,
  auth: authReducer
});

const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose; // compose is a fallback

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const Boomtown = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
