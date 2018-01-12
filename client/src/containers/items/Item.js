import React from 'react';
import Gravatar from 'react-gravatar';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Button from '../../components/UI/Button/Button';

const Item = ({ data }) => {
  let cardOverlay = null;
  if (data.available) {
    cardOverlay = <CardTitle subtitle="UNAVAILABLE" />;
  }

  let cardButton = null;
  if (data.available) {
    cardButton = <Button type="buttonBlack"> BORROW </Button>;
  }

  return (
    <div className="item">
      <Card>
        <CardMedia overlay={cardOverlay}>
          <img src={data.imageurl} alt="" />
        </CardMedia>
        <div className="userInfo">
          <Gravatar email={data.itemowner.email} className="GravatarImg" />
          <CardHeader
            className="cardHeader"
            title={data.itemowner.fullname}
            subtitle="3 Months Ago"
          />
        </div>
        <CardTitle title={data.title} subtitle="Household Items" />
        <CardText>{data.description}</CardText>
        {cardButton}
      </Card>
    </div>
  );
};

export default Item;
