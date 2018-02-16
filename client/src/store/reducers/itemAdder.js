import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  title: '',
  description: '',
  tags: [],
  imageURL: '',
  file: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TITLE:
      return updateObject(state, { title: action.title });
    case actionTypes.UPDATE_TAGS:
      return updateObject(state, { tags: action.tags });
    case actionTypes.UPDATE_DESCRIPTION:
      return updateObject(state, { description: action.description });
    case actionTypes.UPLOAD_IMAGE:
      return updateObject(state, { imageURL: action.url, file: action.file });
    default:
      return state;
  }
};

export default reducer;
