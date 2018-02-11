import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard/ItemCard';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey900, grey600, grey50 } from 'material-ui/styles/colors.js';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class ItemCardList extends Component {
  state = {
    open: false,
    borrowing: {
      status: false,
      item: null
    }
  };

  borrowItem = () => {
    const itemID = this.state.borrowing.item._id;
    console.log('Burrow Button Clicked');
    console.log('Borrowing Item: ', itemID);
  };

  handleOpen = itemToBorrow => {
    console.log('ITEM TO BORROW: ', itemToBorrow._id);
    this.setState({ borrowing: { status: true, item: itemToBorrow } });
  };

  handleClose = () => {
    this.setState({ borrowing: { status: false, item: null } });
  };

  render() {
    console.log(
      ' --------------- [ItemCardList]: Props: ',
      this.props,
      '----------------------'
    );
    const styles = {
      masonry: {
        width: '90%',
        margin: '0 auto'
      }
    };

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

    const itemsList = this.props.items.map(item => {
      return (
        <ItemCard
          key={item._id}
          data={item}
          clicked={() => this.handleOpen(item)}
        />
      );
    });

    return (
      <Auxillary>
        <Masonry style={styles.masonry}>{itemsList}</Masonry>
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

export default ItemCardList;
