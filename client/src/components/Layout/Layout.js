// React, React Router
import React from 'react';
import { withRouter } from 'react-router-dom';
// Prop Types
import PropTypes from 'prop-types';
// Components and Containers
import NavBar from '../Navigation/NavBar/NavBar';
// Material UI
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey900 } from 'material-ui/styles/colors.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
// CSS
import './styles.css';

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem'
  }
};

const Layout = props => {
  let addItemButton = (
    <FloatingActionButton
      style={styles.floatingButton}
      backgroundColor={grey900}
      onClick={() => props.history.push('/share')}
    >
      <ContentAdd />
    </FloatingActionButton>
  );

  let nav = <NavBar />;

  if (props.location.pathname === '/login') {
    addItemButton = null;
    nav = null;
  }

  return (
    <div className="appContentWrapper">
      <div className="appHeader">{nav}</div>
      <div className="appContent">{props.children}</div>
      {addItemButton}
    </div>
  );
};

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default withRouter(Layout);
