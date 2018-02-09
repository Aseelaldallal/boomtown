// React, React Router
import React from 'react';
import { Link } from 'react-router-dom';
// Gravatar
import Gravatar from 'react-gravatar';
// Material UI
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'material-ui/Card';
import { grey900, grey50 } from 'material-ui/styles/colors.js';
import RaisedButton from 'material-ui/RaisedButton';
// Moment
import Moment from 'react-moment';

const ItemCard = props => {
  const styles = {
    itemCard: {
      width: 311,
      margin: 10
    }
  };
  let cardOverlay = null;
  if (props.data.available) {
    cardOverlay = <CardTitle subtitle="UNAVAILABLE" />;
  }

  let cardButton = null;
  if (props.data.available) {
    cardButton = (
      <RaisedButton
        backgroundColor={grey900}
        label="BORROW"
        labelColor={grey50}
        onClick={props.clicked}
      />
    );
  }

  let itemOwnerProfileURL = '/profile/' + props.data.itemowner._id;
  console.log('PROPS. DATA: ', props.data);
  return (
    <div style={styles.itemCard}>
      <Card>
        <CardMedia overlay={cardOverlay}>
          <img src={props.data.imageurl} alt="" />
        </CardMedia>
        <Link to={itemOwnerProfileURL}>
          <CardHeader
            className="cardHeader"
            title={props.data.itemowner.fullname}
            subtitle={<Moment fromNow>{props.data.created}</Moment>}
            avatar={
              <Gravatar
                email={props.data.itemowner.jwt.email}
                className="GravatarImg"
              />
            }
          />
        </Link>
        <CardTitle
          title={props.data.title}
          subtitle={props.data.tags.join(', ')}
        />
        <CardText>{props.data.description}</CardText>
        <CardActions>{cardButton}</CardActions>
      </Card>
    </div>
  );
};

export default ItemCard;
