import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Gravatar from 'react-gravatar';
import axios from 'axios';
import ItemCardList from '../Items/ItemCardList/ItemCardList';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    items: [],
    numItemsBorrowed: 0
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
        numItemsBorrowed: this.getNumberItemsBorrowed(response.data)
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

  render() {
    const styles = {
      paper: {
        height: 200,
        width: '50vw',
        margin: 20
      }
    };

    return (
      <Auxillary>
        <Paper style={styles.paper} zDepth={2}>
          <Gravatar email="aseelaldallal@gmail.com" className="GravatarImg" />
        </Paper>
        <ItemCardList items={this.state.items} />
      </Auxillary>
    );
  }
}

export default UserProfile;
