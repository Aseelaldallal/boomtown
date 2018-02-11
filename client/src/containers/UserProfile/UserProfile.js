// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// axios
import axios from 'axios';
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

  fetchCurrentUser() {
    axios
      .get(`http://localhost:3001/users/${this.props.match.params.userId}`)
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
