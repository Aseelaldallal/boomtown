// React
import React, { Component } from 'react';
// axios
import axios from 'axios';
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

  componentDidMount = () => {
    console.log('PROPS: ', this.props);

    axios
      .get(`http://localhost:3001/users/${this.props.match.params.userId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <div>hi</div>;
  }
}

export default UserProfile;
