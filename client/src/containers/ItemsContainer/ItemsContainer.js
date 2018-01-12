import React, { Component } from 'react';
import ItemCardList from '../../components/ItemCardList/ItemCardList';

class ItemsContainer extends Component {
  state = {
    items: []
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
      const user = users.find(user => {
        return user.id === item.itemowner;
      });
      const borrower = users.find(user => {
        return item.borrower === user.id;
      });
      if (borrower) item.borrower = borrower;
      item.itemowner = user;
      return item;
    });
    this.setState({ items: updatedItems });
  }

  render() {
    return <ItemCardList items={this.state.items} />;
  }
}

export default ItemsContainer;
