import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {tags} from '../../../constants/constants';
import {withRouter} from 'react-router-dom';

class ItemSelectField extends Component {

  state = {
    values: [],
  };

  handleChange = (event, index, values) => {
      this.setState({values});
      const queryString = '?selectedTags=' + encodeURIComponent(values); 
      this.props.history.push({
        pathname: '/items',
        search: queryString
      });
  }

  menuItems(values) {
    return tags.map((name) => (
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
    //   console.log("MY PROPS: ", this.props);
    const {values} = this.state;
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