import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  title: 'Title',
  description: 'Description',
  tags: [],
  created: 'a few seconds ago',
  authUser: {
    id: '234234242',
    jwt: {
      email: 'aseelaldallal@gmail.com'
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TITLE:
      return updateObject(state, { title: action.title });
    case actionTypes.UPDATE_TAGS:
      return updateObject(state, { tags: action.tags });
    case actionTypes.UPDATE_DESCRIPTION:
      return updateObject(state, { description: action.description });
    default:
      return state;
  }
};

export default reducer;
