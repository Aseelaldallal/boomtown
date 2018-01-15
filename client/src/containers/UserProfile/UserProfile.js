import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Gravatar from 'react-gravatar';
import axios from 'axios';
import ItemCardList from '../../components/Items/ItemCardList/ItemCardList';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    items: [],
    numItemsBorrowed: 0,
    numItemsShared: 0
  };

  componentDidMount = () => {
    axios.get('http://localhost:3001/users').then(response => {
      this.setState({
        user: this.getUser(response.data)
      });
    });
    axios.get('http://localhost:3001/items').then(response => {
      this.setState({
        items: this.getUserItems(response.data),
        numItemsBorrowed: this.getNumberItemsBorrowed(response.data),
        numItemsShared: this.getNumberItemsShared(response.data)
      });
    });
  };

  getUser = users => {
    return users.find(user => {
      return this.props.match.params.userid === user.id;
    });
  };

  getUserItems = items => {
    return items.filter(item => {
      return this.props.match.params.userid === item.itemowner;
    });
  };

  getNumberItemsBorrowed = items => {
    let itemsBorrowed = items.filter(item => {
      return this.props.match.params.userid === item.borrower;
    });
    return itemsBorrowed.length;
  };

  getNumberItemsShared = items => {
    let itemsShared = items.filter(item => {
      return items.borrower != null;
    });
    return itemsShared.length;
  };

  render() {
    let profile = null;
    if (this.state.user) {
      profile = (
        <div className="userProfileContainer">
          <div className="paperBox">
            <div className="item-a">
              <h1>{this.state.user.fullname}</h1>
              <p>{this.state.user.bio}</p>
            </div>
            <div className="item-b">
              <h3>{this.state.numItemsShared}</h3>
              <p>Items shared</p>
            </div>
            <div className="item-c">
              <h3>{this.state.numItemsBorrowed}</h3>
              <p>Items borrowed</p>{' '}
            </div>
            <div className="item-d">
              <Gravatar
                className="paperGravatar"
                email={this.state.user.email}
              />
            </div>
          </div>
          <ItemCardList items={this.state.items} />
        </div>
      );
    }
    return <Auxillary>{profile}</Auxillary>;
  }
}

export default UserProfile;
