// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// Axios
import axios from 'axios';
// Gravatar
import Gravatar from 'react-gravatar';
// Components and Containers
import ItemCardList from '../../components/Items/ItemCardList/ItemCardList';
import Auxillary from '../../hoc/Auxillary/Auxillary';
// Styling
import './UserProfile.css';

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let profile = null;
    if (this.props.users) {
      let currentUser = this.props.user.filter(user => {
        return (user._id = this.props.match.params.userId);
      });
    }
    return <div>hi</div>;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(actions.fetchItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
