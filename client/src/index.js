import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import Login from './containers/Login';
import ItemsContainer from './containers/Items/ItemsContainer/ItemsContainer';
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Boomtown = () => (
  <BrowserRouter>
    <Switch>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Layout>
          <Route path="/login" component={Login} />
          <Route exact path="/items" component={ItemsContainer} />
          <Route exact path="/profile/:userid" component={UserProfile} />
        </Layout>
      </MuiThemeProvider>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
