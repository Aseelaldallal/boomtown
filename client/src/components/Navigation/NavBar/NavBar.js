// React
import React from 'react';
// Containers and Components
import AppBar from 'material-ui/AppBar';
import Logo from '../../../images/boomtown-logo.svg';
import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const styles = {
  logoHeight: {
    height: 40
  },
  appBar: {
    backgroundColor: 'white',
    height: 75,
    padding: '10px 40px'
  }
};

const buttons = (
  <Auxillary>
    <Button type="buttonBlue">My Profile</Button>
    <Button type="buttonBlack">Logout </Button>
  </Auxillary>
);


const NavBar = () => {

  return (
    <AppBar
      style={styles.appBar}
      title="SELECT FIELD GOES HERE"
      iconElementLeft={
        <img style={styles.logoHeight} src={Logo} alt="logo" />
      }
      iconElementRight={buttons}
    />
  );

}


export default NavBar;
