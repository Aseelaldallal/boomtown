import React from 'react';
import Gravatar from 'react-gravatar';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'material-ui/Card';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const Item = props => {
  let cardOverlay = null;
  if (props.data.available) {
    cardOverlay = <CardTitle subtitle="UNAVAILABLE" />;
  }

  let cardButton = null;
  if (props.data.available) {
    cardButton = <Button type="buttonBlack"> BORROW </Button>;
  }

  let itemOwnerProfileURL = '/profile/' + props.data.itemowner.id;

  return (
    <div className="item">
      <Card>
        <CardMedia overlay={cardOverlay}>
          <img src={props.data.imageurl} alt="" />
        </CardMedia>
        {/* <Link to={itemOwnerProfileURL}> */}
        <CardHeader
          className="cardHeader"
          title={props.data.itemowner.fullname}
          subtitle="3 Months Ago"
          onClick={() =>
            props.history.push(`/profile/${props.data.itemowner.id}`)
          }
          avatar={
            <Gravatar
              email={props.data.itemowner.email}
              className="GravatarImg"
            />
          }
        />
        {/* </Link> */}
        <CardTitle title={props.data.title} subtitle="Household Items" />
        <CardText>{props.data.description}</CardText>
        <CardActions>{cardButton}</CardActions>
      </Card>
    </div>
  );
};

export default withRouter(Item);
