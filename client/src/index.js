// React
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Material UI, Styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './config/theme';
import './index.css';
// Components and Containers
import Layout from './components/Layout';
import Login from './containers/Login';
import ItemsContainer from './containers/Items/ItemsContainer/ItemsContainer';
import UserProfile from './components/UserProfile/UserProfile';
import ItemAdder from './containers/Items/ItemAdder/ItemAdder';
// Register Service Worker
import registerServiceWorker from './registerServiceWorker';

const Boomtown = () => (
  <BrowserRouter>
    <Switch>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Layout>
          <Route path="/login" component={Login} />
          <Route exact path="/items" component={ItemsContainer} />
          <Route exact path="/profile/:userid" component={UserProfile} />
          <Route exact path="/share" component={ItemAdder} />
        </Layout>
      </MuiThemeProvider>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
