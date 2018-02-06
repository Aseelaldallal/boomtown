// React
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import itemsReducer from './store/reducers/items';
import usersReducer from './store/reducers/users';
import authReducer from './store/reducers/auth';
// Material UI, Styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './config/theme';
import './index.css';
// Components and Containers
import Layout from './components/Layout';
import LoginContainer from './containers/Login/LoginContainer';
import RegisterContainer from './containers/Register/RegisterContainer';
import ItemsContainer from './containers/Items/ItemsContainer/ItemsContainer';
import UserProfile from './containers/UserProfile/UserProfile';
import ItemAdder from './containers/Items/ItemAdder/ItemAdder';
// Register Service Worker
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  items: itemsReducer,
  users: usersReducer,
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
      <Switch>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
            <Route exact path="/items" component={ItemsContainer} />
            <Route exact path="/profile/:userid" component={UserProfile} />
            <Route exact path="/share" component={ItemAdder} />
          </Layout>
        </MuiThemeProvider>
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
