// React
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// axios
import axios from '../../axios-server';
// Components and Containers
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Profile from '../../components/Profile/Profile';
// Utility
import _ from 'lodash';
// Styling
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    error: null
  };

  componentDidMount() {
    this.props.fetchItems();
    this.fetchCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.props.fetchItems();
      this.fetchCurrentUser(nextProps);
    }
  }

  fetchCurrentUser(nextProps) {
    let userID = this.props.match.params.userId;
    if (nextProps) {
      userID = nextProps.match.params.userId;
    }
    axios
      .get(`/users/${userID}`)
      .then(response => {
        this.setState({ user: response.data[0] });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  getUserItems() {
    let userItems = this.props.items.filter(item => {
      return _.includes(this.state.user.itemsowned, item._id);
    });
    return userItems;
  }

  countBorrowedItems() {
    let borrowedItems = this.props.items.filter(item => {
      return item.borrower === this.state.user._id;
    });
    return borrowedItems.length;
  }

  render() {
    let profile = null;
    if (this.props.items && this.state.user) {
      profile = (
        <Profile
          user={this.state.user}
          itemsowned={this.getUserItems()}
          numItemsBorrowed={this.countBorrowedItems()}
        />
      );
    }

    return <Auxillary>{profile}</Auxillary>;
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.unfilteredItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(actions.fetchItems())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);
