import React, { Component } from 'react';
import ItemCardList from '../../../components/Items/ItemCardList/ItemCardList';

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

  render() {
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
    return <ItemCardList items={items} />;
  }
}

export default ItemsContainer;
