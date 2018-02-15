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
import UserProfile from './containers/UserProfile/UserProfile';
import ItemAdder from './containers/Items/ItemAdder/ItemAdder';
import Auxillary from './hoc/Auxillary/Auxillary';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Auxillary>
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route exact path="/items" component={ItemsContainer} />
        <Route exact path="/profile/:userId" component={UserProfile} />
        <Route component={NotFound} />
      </Auxillary>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Auxillary>
          <Route path="/login" component={LoginContainer} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterContainer} />
          <Route exact path="/items" component={ItemsContainer} />
          <Route exact path="/profile/:userId" component={UserProfile} />
          <Route exact path="/share" component={ItemAdder} />
          <Route component={NotFound} />
        </Auxillary>
      );
    }

    return (
      <Switch>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout>{routes}</Layout>
        </MuiThemeProvider>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.auth_user_token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
