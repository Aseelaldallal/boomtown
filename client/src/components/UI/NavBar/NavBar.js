import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from '../../../images/boomtown-logo.svg';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Button from '../Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

import './NavBar.css';

const NavBar = () => {
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

  const dropDownMenu = (
    <DropDownMenu
      value={'HELLOOOOOOOOOO'}
      style={styles.dropDownMenu}
      autoWidth={false}
    >
      <MenuItem value={1} primaryText="Hard Coded" />
      <MenuItem value={2} primaryText="Hard Coded" />
      <MenuItem value={3} primaryText="Hard Coded" />
      <MenuItem value={4} primaryText="Hard Coded" />
      <MenuItem value={5} primaryText="Hard Coded" />
    </DropDownMenu>
  );

  const buttons = (
    <Auxillary>
      <Button type="buttonBlue">My Profile</Button>
      <Button type="buttonBlack">Logout </Button>
    </Auxillary>
  );

  return (
    <AppBar
      style={styles.appBar}
      title={dropDownMenu}
      className="NavBar"
      iconElementLeft={<img style={styles.logoHeight} src={Logo} />}
      iconElementRight={buttons}
    />
  );
};

export default NavBar;
