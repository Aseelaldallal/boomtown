import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  title: 'Enter Title',
  description: 'Enter Description',
  tags: [],
  imageURL: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TITLE:
      return updateObject(state, { title: action.title });
    case actionTypes.UPDATE_TAGS:
      return updateObject(state, { tags: action.tags });
    case actionTypes.UPDATE_DESCRIPTION:
      return updateObject(state, { description: action.description });
    case actionTypes.UPLOAD_IMAGE_SUCCESS:
      console.log('UPLOAD IMG');
      return updateObject(state, { imageURL: action.url });
    default:
      return state;
  }
};

export default reducer;
