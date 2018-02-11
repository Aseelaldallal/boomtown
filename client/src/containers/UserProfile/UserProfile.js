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
    console.log('[ComponentDidMount]: Items: ', this.props.items);
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
    console.log('Items owned: ', this.state.user.itemsowned);
    // this.state.user.itemsowned.map(itemid => {
    //   console.log('--------------------------');
    //   console.log('itemid: ', itemid);
    //   const item = this.props.items.find(currItem => {
    //     console.log('-----');
    //     console.log('currItem: ', currItem);
    //     return currItem._id === itemid;
    //   });
    //   if (item) userItems.push(item);
    // });
    let userItems = this.props.items.filter(item => {
      console.log('itemid: ', item._id);
      return _.includes(this.state.user.itemsowned, item._id);
    });
    console.log('UserItems: ', userItems);
    return userItems;
  }

  render() {
    let profile = null;
    if (this.props.items && this.state.user) {
      let userItems = this.getUserItems();
      profile = <Profile user={this.state.user} itemsowned={userItems} />;
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
