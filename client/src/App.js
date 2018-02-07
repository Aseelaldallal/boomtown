// React
import React, { Component } from 'react';
// React Router
import { Switch, Route, withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/';
// Material UI, Styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './config/theme';
import './index.css';
// Components and Containers
import Layout from './components/Layout';
import Logout from './containers/Logout/Logout';
import LoginContainer from './containers/Login/LoginContainer';
import RegisterContainer from './containers/Register/RegisterContainer';
import ItemsContainer from './containers/Items/ItemsContainer/ItemsContainer';
import UserProfile from './containers/UserProfile/UserProfile2';
import ItemAdder from './containers/Items/ItemAdder/ItemAdder';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Switch>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout>
            <Route path="/login" component={LoginContainer} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterContainer} />
            <Route exact path="/items" component={ItemsContainer} />
            <Route exact path="/users/:userId" component={UserProfile} />
            <Route exact path="/share" component={ItemAdder} />
          </Layout>
        </MuiThemeProvider>
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
