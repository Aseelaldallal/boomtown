import React, { Component } from 'react';
import ItemCardList from '../../../components/Items/ItemCardList/ItemCardList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import { grey900, grey600, grey50 } from 'material-ui/styles/colors.js';

class ItemsContainer extends Component {
  state = {
    items: [],
    open: false,
    borrowing: {
      status: false,
      item: null
    }
  };

  componentDidMount = () => {
    let itemsAPI = 'http://localhost:3001/items';
    let usersAPI = 'http://localhost:3001/users';
    const urls = [itemsAPI, usersAPI];
    Promise.all(urls.map(curr => fetch(curr).then(resp => resp.json()))).then(
      data => {
        this.linkItemsToUsers(data[0], data[1]);
      }
    );
  };

  linkItemsToUsers(items, users) {
    const updatedItems = items.map(item => {
      const borrower = users.find(user => item.borrower === user.id);
      if (borrower) item.borrower = borrower;
      item.itemowner = users.find(user => user.id === item.itemowner);
      return item;
    });
    this.setState({ items: updatedItems });
  }

  intersect = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
      if (array2.includes(array1[i])) {
        return true;
      }
    }
    return false;
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

    let items = this.state.items;
    if (this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const selectedTags = query
        .entries()
        .next()
        .value[1].split(',');
      items = items.filter(item => {
        return this.intersect(item.tags, selectedTags);
      });
    }

    let itemTitle = null;
    let itemOwner = null;
    if (this.state.borrowing.item) {
      itemTitle = this.state.borrowing.item.title;
      itemOwner = this.state.borrowing.item.itemowner.fullname;
    }
    return (
      <Auxillary>
        <ItemCardList items={items} clicked={this.handleOpen} />
        <Dialog
          title="Borrow Item"
          actions={actions}
          modal={true}
          open={this.state.borrowing.status}
        >
          Do you want to request to borrow {itemTitle} from {itemOwner}?
        </Dialog>
      </Auxillary>
    );
  }
}

export default ItemsContainer;
