// React
import React from 'react';
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
// React Router
import { Link } from 'react-router-dom';

const ItemCard = props => {
  const styles = {
    itemCard: {
      width: '30%',
      margin: '0.6rem'
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
      />
    );
  }

  let itemOwnerProfileURL = '/profile/' + props.data.itemowner.id;

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
            subtitle="3 Months Ago"
            avatar={
              <Gravatar
                email={props.data.itemowner.email}
                className="GravatarImg"
              />
            }
          />
        </Link>
        <CardTitle title={props.data.title} subtitle="Household Items" />
        <CardText>{props.data.description}</CardText>
        <CardActions>{cardButton}</CardActions>
      </Card>
    </div>
  );
};

export default ItemCard;
