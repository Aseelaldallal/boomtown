import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from '../../../images/boomtown-logo.svg';
import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

import './NavBar.css';

class NavBar extends Component {
  render() {
    const styles = {
      logoHeight: {
        height: 40
      },
      appBar: {
        backgroundColor: 'white',
        height: 75,
        padding: '10px 40px'
      },
      dropDownMenu: {
        textAlign: 'left',
        width: 350,
        color: 'black'
      },
      buttonMargin: {
        marginRight: '1rem'
      },
      button: {
        backgroundColor: 'black',
        color: 'white'
      }
    };

    const buttons = (
      <Auxillary>
        <Button type="buttonBlue">My Profile</Button>
        <Button type="buttonBlack">Logout </Button>
      </Auxillary>
    );

    return (
      <AppBar
        style={styles.appBar}
        title="Select goes here"
        iconElementLeft={
          <img style={styles.logoHeight} src={Logo} alt="logo" />
        }
        iconElementRight={buttons}
      />
    );
  }
}

export default NavBar;
