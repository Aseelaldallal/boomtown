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
// Styling and Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey900, grey600, grey50 } from 'material-ui/styles/colors.js';
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    user: null,
    items: [],
    numItemsBorrowed: 0,
    numItemsShared: 0,
    open: false,
    borrowing: {
      status: false,
      item: null
    }
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

  borrowItem = () => {
    const itemID = this.state.borrowing.item.id;
    console.log('Burrow Button Clicked');
    console.log('Borrowing Item: ', this.state.borrowing.item.id);
  };

  handleOpen = itemToBorrow => {
    console.log('ITEM TO BORROW: ', itemToBorrow.id);
    this.setState({ borrowing: { status: true, item: itemToBorrow } });
  };

  handleClose = () => {
    this.setState({ borrowing: { status: false, item: null } });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Borrow"
        primary={true}
        onClick={this.borrowItem}
        backgroundColor={grey900}
        labelStyle={{ color: grey50 }}
        hoverColor={grey600}
      />
    ];
    let itemTitle = null;
    let itemOwner = null;
    if (this.state.borrowing.item) {
      itemTitle = this.state.borrowing.item.title;
      itemOwner = this.state.borrowing.item.itemowner.fullname;
    }
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
          <ItemCardList items={this.state.items} clicked={this.handleOpen} />
          <Dialog
            title="Borrow Item"
            actions={actions}
            modal={true}
            open={this.state.borrowing.status}
          >
            Do you want to request to borrow {itemTitle} from {itemOwner}?
          </Dialog>
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
