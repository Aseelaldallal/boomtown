import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Navigation/NavBar/NavBar';
import './styles.css';

const Layout = ({ children }) => (
  <div className="appContentWrapper">
    <div className="appHeader">
      <NavBar />
    </div>
    <div className="appContent">{children}</div>
    {/* And a footer here, but not on the login route... */}
  </div>
);

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
