import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import UploadDirections from './UploadDirections/UploadDirections';
import ItemCard from '../../../components/Items/ItemCard/ItemCard';

import './ItemAdder.css';

class ItemAdder extends Component {
 
  render() {
    let itemAdder = null;

    const itemData = {
      title: this.props.title,
      description: this.props.description,
      tags: this.props.tags,
      imageurl: this.props.imageurl,
      borrower: null,
      created: new Date(),
      itemowner: {
        id: this.props.authUserId,
        jwt: {
          email: this.props.authUserEmail
        }
      }
    };
    itemAdder = (
      <div className="itemAdder">
        <ItemCard data={itemData} />
        <div className="imageDirections">
          <UploadDirections />
        </div>
      </div>
    );

    return <Auxillary>{itemAdder} </Auxillary>;
  }
}

const mapStateToProps = state => {
  return {
    title: state.itemAdder.title,
    description: state.itemAdder.description,
    tags: state.itemAdder.tags,
    imageurl: state.itemAdder.imageURL,
    authUserId: state.auth.auth_user_id,
    authUserEmail: state.auth.auth_user_email
  };
};

export default connect(mapStateToProps)(ItemAdder);
