// React
import React from 'react';
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

const NavBar = props => {
  const handleAuthentication = () => {
    if (props.isAuthenticated) {
      props.history.push('/logout');
    } else {
      props.history.push('/login');
    }
  };

  const viewProfile = () => {
    props.history.push(`/profile/${props.userId}`);
  };

  const buttons = (
    <Auxillary>
      {props.isAuthenticated ? (
        <RaisedButton
          label="MY PROFILE"
          primary={true}
          style={styles.button}
          onClick={viewProfile}
        />
      ) : null}
      <RaisedButton
        backgroundColor={grey900}
        label={props.isAuthenticated ? 'LOGOUT' : 'LOGIN'}
        labelColor={grey50}
        style={styles.button}
        onClick={handleAuthentication}
      />
    </Auxillary>
  );

  let itemSelectField = null;
  if (props.location.pathname === '/items') {
    itemSelectField = <ItemSelectField />;
  }

  let bar = null;

  if (
    props.location.pathname !== '/login' &&
    props.location.pathname !== '/register'
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
};

export default withRouter(NavBar);
