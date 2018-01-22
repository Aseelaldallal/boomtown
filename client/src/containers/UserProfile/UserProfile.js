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

  componentDidMount = () => {
    this.props.fetchItemsAndUsers();
    if (this.props.users.length > 0 && this.props.items.length > 0) {
      this.setState({
        user: this.getUser(this.props.users),
        items: this.getUserItems(this.props.items)
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.users && this.props.items) {
      if (this.props.users.length !== nextProps.users.length) {
        this.setState({
          user: this.getUser(nextProps.users)
        });
      }
      if (this.props.items.length !== nextProps.items.length) {
        this.setState({
          items: this.getUserItems(nextProps.items)
        });
      }
    }
  }

  getUser = users => {
    return users.find(user => {
      return this.props.match.params.userid === user.id;
    });
  };

  getUserItems = items => {
    return items.filter(item => {
      return this.props.match.params.userid === item.itemowner.id;
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
              <p>Items borrowed</p>
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
