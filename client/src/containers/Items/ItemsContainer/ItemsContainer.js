// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';
// Components and Containers
import ItemCardList from '../../../components/Items/ItemCardList/ItemCardList';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class ItemsContainer extends Component {
  componentDidMount = () => {
    this.props.fetchItemsAndUsers();
  };

  render() {
    let toRender = null;
    if (this.props.items) {
      toRender = <ItemCardList items={this.props.items} />;
    }

    return <Auxillary>{toRender}</Auxillary>;
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
