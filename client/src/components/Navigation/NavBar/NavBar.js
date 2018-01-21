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

const buttons = (
  <Auxillary>
    <RaisedButton label="MY PROFILE" primary={true} style={styles.button} />
    <RaisedButton
      backgroundColor={grey900}
      label="LOGOUT"
      labelColor={grey50}
      style={styles.button}
    />
  </Auxillary>
);

const NavBar = props => {
  let itemSelectField = null;
  if (props.location.pathname === '/items') {
    itemSelectField = <ItemSelectField />;
  }
  return (
    <AppBar
      style={styles.appBar}
      title={itemSelectField}
      iconElementLeft={<img style={styles.logoHeight} src={Logo} alt="logo" />}
      iconElementRight={buttons}
    />
  );
};

export default withRouter(NavBar);
