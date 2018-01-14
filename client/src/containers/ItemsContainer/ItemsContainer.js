import React, { Component } from 'react';
import ItemCardList from '../../components/Items/ItemCardList/ItemCardList';
import _ from 'underscore';

class ItemsContainer extends Component {
  state = {
    items: [],
    values: []
  };

  componentDidMount = () => {
    let itemsAPI = 'http://localhost:3001/items';
    let usersAPI = 'http://localhost:3001/users';

    const urls = [itemsAPI, usersAPI];

    Promise.all(urls.map(curr => fetch(curr).then(resp => resp.json()))).then(
      data => {
        this.linkItemsToUsers(data[0], data[1]);
        // console.log("---- [ItemsContainer: componentDidMount] ----");
        // console.log("State: " , this.state);
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


  // componentWillMount = () => {
  //   console.log("---- [ItemsContainer: componentWillMount] ----");
  //   console.log("State: " , this.state);
  // }


  render() {
    console.log("itemscontainer props: ", this.props);
    let items = this.state.items;
    // if(this.state.values.length !== 0) {
    //   items = items.filter(item=> {
    //     console.log("ITEM: ", item);
    //     console.log(_.intersection(item.tags, this.state.values));
    //     return _.intersection(item.tags, this.state.values).length !== 0;
    //   })
    // }
    // console.log("---- [ItemsContainer: render] ----");
    // console.log("State: " , this.state);
    return <ItemCardList items={items} />;
  }
}

export default ItemsContainer;
