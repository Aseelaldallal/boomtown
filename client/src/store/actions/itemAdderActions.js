import * as actionTypes from './actionTypes';

const getItems = items => ({ type: actionTypes.GET_ITEMS, items: items }); // should really name this to get items success

const updateTitle = title => ({
  type: actionTypes.UPDATE_TITLE,
  title: title
});

const updateDescription = description => ({
  type: actionTypes.UPDATE_DESCRIPTION,
  description: description
});

const updateTags = tags => ({
  type: actionTypes.UPDATE_TAGS,
  tags: tags
});
