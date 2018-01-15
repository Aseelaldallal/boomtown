import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
// Material UI
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import './ImageUploader.css';

class ImageUploader extends Component {
  render() {
    const styles = {
      card: {
        height: 425
      }
    };

    return (
      <Card style={styles.card}>
        <CardMedia>
          <div className="image">
            <i className="fa fa-picture-o" aria-hidden="true" />
          </div>
        </CardMedia>
        <CardHeader
          className="cardHeader"
          subtitle="A few seconds ago"
          avatar={<Gravatar email="aseelaldallal@gmail.com" />}
        />

        <CardTitle title="Amazing Item Title" />
        <CardText>Profound Item Description</CardText>
      </Card>
    );
  }
}

export default ImageUploader;
