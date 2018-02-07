// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// Gravatar
import Gravatar from 'react-gravatar';
// Components and Containers
import ItemCardList from '../../components/Items/ItemCardList/ItemCardList';
import Auxillary from '../../hoc/Auxillary/Auxillary';
// Styling
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    items: [],
    numItemsBorrowed: 0,
    numItemsShared: 0
  };

  render() {}
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    items: state.items.unfilteredItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItemsAndUsers: () => dispatch(actions.fetchItemsAndUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
