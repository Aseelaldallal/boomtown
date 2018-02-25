// React
import React, { Component } from 'react';
//Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';
// Components and Containers
import ItemCard from '../ItemCard/ItemCard';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
// Styling: Material UI, Masonry
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey900, grey600, grey50 } from 'material-ui/styles/colors.js';
import Masonry from 'react-masonry-component';

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
    this.props.borrowItem(
      itemID,
      this.props.authUser,
      this.props.authUserToken
    );
    this.setState({
      borrowing: { status: false, item: null },
      open: false
    });
  };

  handleOpen = itemToBorrow => {
    this.setState({ borrowing: { status: true, item: itemToBorrow } });
    console.log(itemToBorrow);
  };

  handleClose = () => {
    this.setState({ borrowing: { status: false, item: null } });
  };

  render() {
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
          authUser={this.props.authUser}
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

const mapStateToProps = state => {
  return {
    authUser: state.auth.auth_user_id,
    authUserToken: state.auth.auth_user_token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    borrowItem: (itemId, borrowerId, token) =>
      dispatch(actions.borrowItem(itemId, borrowerId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCardList);
