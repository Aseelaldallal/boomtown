import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Gravatar from 'react-gravatar';
import axios from 'axios';
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    items: []
  };

  componentDidMount = () => {
    axios.get('http://localhost:3001/users').then(response => {
      this.setState({ user: this.getUser(response.data) });
    });
    axios.get('http://localhost:3001/items').then(response => {
      this.setState({ items: this.getUserItems(response.data) });
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

  render() {
    const styles = {
      paper: {
        height: 200,
        width: '50vw',
        margin: 20
      }
    };

    return (
      <Paper style={styles.paper} zDepth={2}>
        <Gravatar email="aseelaldallal@gmail.com" className="GravatarImg" />
      </Paper>
    );
  }
}

export default UserProfile;
