// React, React Router
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
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

class Layout extends Component {
  render() {
    let addItemButton = null;
    if (
      this.props.location.pathname !== '/login' &&
      this.props.isAuthenticated
    ) {
      addItemButton = (
        <FloatingActionButton
          style={styles.floatingButton}
          backgroundColor={grey900}
          onClick={() => this.props.history.push('/share')}
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    }

    return (
      <div className="appContentWrapper">
        <div className="appHeader">
          <NavBar
            isAuthenticated={this.props.isAuthenticated}
            userId={this.props.userId}
          />
        </div>
        <div className="appContent">{this.props.children}</div>
        {addItemButton}
        {/* And a footer here, but not on the login route... */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.auth_user_token !== null,
    userId: state.auth.auth_user_id
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
