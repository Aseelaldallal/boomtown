// React
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';
// Material-UI
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// Constants
import { tags } from '../../../constants/constants';

class ItemSelectField extends Component {
  state = {
    values: []
  };

  handleChange = (event, index, values) => {
    this.setState({ values });
    this.props.onSelectTags(values); // values = selectedTags
  };

  menuItems(values) {
    return tags.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <SelectField
        multiple={true}
        hintText="Select a name"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}

export default withRouter(ItemSelectField);
