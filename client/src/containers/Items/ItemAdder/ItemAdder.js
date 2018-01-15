import React, { Component } from 'react';
import ImageUploader from './ImageUploader/ImageUploader';
import UploadDirections from './UploadDirections/UploadDirections';
import './ItemAdder.css';

class ItemAdder extends Component {
  render() {
    return (
      <div className="itemAdder">
        <ImageUploader className="imageUploadSection" />
        <div className="imageDirections">
          <UploadDirections />
        </div>
      </div>
    );
  }
}

export default ItemAdder;
