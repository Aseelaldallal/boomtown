import * as actionTypes from './actionTypes';

export const updateTitle = title => ({
  type: actionTypes.UPDATE_TITLE,
  title: title
});

export const updateDescription = description => ({
  type: actionTypes.UPDATE_DESCRIPTION,
  description: description
});

// export const uploadImage = (url) => dispatch => {
//   console.log('Uploading image...');
// };

export const uploadImage = (url, file) => ({
  type: actionTypes.UPLOAD_IMAGE,
  url: url,
  file: file
});

export const updateTags = tags => ({
  type: actionTypes.UPDATE_TAGS,
  tags: tags
});

// const uploadImageSuccess = imageURL => ({
//   type: actionTypes.UPLOAD_IMAGE_SUCCESS,
//   imageURL: imageURL
// });

// const uploadImageFail = error => ({
//   type: actionTypes.UPLOAD_IMAGE_FAIL,
//   error: error
// });
