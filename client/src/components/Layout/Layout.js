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

const Layout = ({ children, history }) => {
  return (
    <div className="appContentWrapper">
      <div className="appHeader">
        <NavBar />
      </div>
      <div className="appContent">{children}</div>
      <FloatingActionButton
        style={styles.floatingButton}
        backgroundColor={grey900}
        onClick={() => history.push('/share')}
      >
        <ContentAdd />
      </FloatingActionButton>
      {/* And a footer here, but not on the login route... */}
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
