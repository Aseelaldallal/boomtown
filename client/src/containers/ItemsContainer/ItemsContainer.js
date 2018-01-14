import React, { Component } from 'react';
import ItemCardList from '../../components/Items/ItemCardList/ItemCardList';
import _ from 'underscore';

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
    let items = this.state.items;
    console.log('[RENDER]: ItemsContainer');
    if (this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const selectedTags = query.entries().next().value;
      items = items.filter(item => {
        return _.intersection(selectedTags, item.tags).length > 0;
      });
      console.log(items);
    }
    return <ItemCardList items={items} />;
  }
}

export default ItemsContainer;
