// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';

// Material-UI
import ItemCardList from '../../../components/Items/ItemCardList/ItemCardList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey900, grey600, grey50 } from 'material-ui/styles/colors.js';
// Components and Containers
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class ItemsContainer extends Component {
  state = {
    open: false,
    borrowing: {
      status: false,
      item: null
    }
  };

  componentDidMount = () => {
    this.props.fetchItemsAndUsers();
  };

  // intersect = (array1, array2) => {
  //   for (let i = 0; i < array1.length; i++) {
  //     if (array2.includes(array1[i])) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  borrowItem = () => {
    // const itemID = this.state.borrowing.item.id;
    // console.log('Burrow Button Clicked');
    // console.log('Borrowing Item: ', this.state.borrowing.item.id);
  };

  handleOpen = itemToBorrow => {
    // console.log('ITEM TO BORROW: ', itemToBorrow.id);
    // this.setState({ borrowing: { status: true, item: itemToBorrow } });
  };

  handleClose = () => {
    this.setState({ borrowing: { status: false, item: null } });
  };

  render() {
    // const actions = [
    //   <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
    //   <FlatButton
    //     label="Borrow"
    //     primary={true}
    //     onClick={this.borrowItem}
    //     backgroundColor={grey900}
    //     labelStyle={{ color: grey50 }}
    //     hoverColor={grey600}
    //   />
    // ];

    let items = this.props.items;
    console.log('PROPS: ', this.props);

    // if (this.props.location.search) {
    //   const query = new URLSearchParams(this.props.location.search);
    //   const selectedTags = query
    //     .entries()
    //     .next()
    //     .value[1].split(',');
    //   items = items.filter(item => {
    //     return this.intersect(item.tags, selectedTags);
    //   });
    // }

    // let itemTitle = null;
    // let itemOwner = null;
    // if (this.state.borrowing.item) {
    //   itemTitle = this.state.borrowing.item.title;
    //   itemOwner = this.state.borrowing.item.itemowner.fullname;
    // }
    return (
      <ItemCardList items={items} clicked={this.handleOpen} />
      // {/* <Dialog
      //   title="Borrow Item"
      //   actions={actions}
      //   modal={true}
      //   open={this.state.borrowing.status}
      // >
      //   Do you want to request to borrow {itemTitle} from {itemOwner}?
      // </Dialog> */}
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.filteredItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItemsAndUsers: () => dispatch(actions.fetchItemsAndUsers())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
