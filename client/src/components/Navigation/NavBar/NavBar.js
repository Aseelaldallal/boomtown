// React
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Containers and Components
import AppBar from 'material-ui/AppBar';
import Logo from '../../../images/boomtown-logo.svg';
import RaisedButton from 'material-ui/RaisedButton';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import ItemSelectField from '../../../containers/Items/ItemSelectField/ItemSelectField';
import { grey900, grey50 } from 'material-ui/styles/colors.js';

const styles = {
  logoHeight: {
    height: 40
  },
  appBar: {
    backgroundColor: 'white',
    height: 75,
    padding: '10px 40px'
  },
  button: {
    marginRight: '0.5rem'
  }
};

class NavBar extends Component {
  handleAuthentication = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push('/logout');
    } else {
      this.props.history.push('/login');
    }
  };

  viewProfile = () => {
    this.props.history.push(`/profile/${this.props.userId}`);
  };

  render() {
    let buttons = (
      <Auxillary>
        {this.props.isAuthenticated ? (
          <RaisedButton
            label="MY PROFILE"
            primary={true}
            style={styles.button}
            onClick={this.viewProfile}
          />
        ) : null}
        <RaisedButton
          backgroundColor={grey900}
          label={this.props.isAuthenticated ? 'LOGOUT' : 'LOGIN'}
          labelColor={grey50}
          style={styles.button}
          onClick={this.handleAuthentication}
        />
      </Auxillary>
    );

    let itemSelectField = null;
    if (this.props.location.pathname === '/items') {
      itemSelectField = <ItemSelectField />;
    }
    let bar = null;
    if (
      this.props.location.pathname !== '/login' &&
      this.props.location.pathname !== '/register'
    ) {
      bar = (
        <AppBar
          style={styles.appBar}
          title={itemSelectField}
          iconElementLeft={
            <img style={styles.logoHeight} src={Logo} alt="logo" />
          }
          iconElementRight={buttons}
        />
      );
    }
    return <Auxillary>{bar} </Auxillary>;
  }
}

export default withRouter(NavBar);
