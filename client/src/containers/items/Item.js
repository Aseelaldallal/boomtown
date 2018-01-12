import React from 'react';

import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

const Item = ({ data }) => (
  <div className="item">
    <Card>
      <CardMedia
        overlay={
          <CardTitle subtitle={data.available ? 'AVAILABLE' : 'UNAVAILABLE'} />
        }
      >
        <img src={data.imageurl} alt="" />
      </CardMedia>
      <CardHeader
        title={data.itemowner.fullname}
        subtitle="3 Months Ago"
        avatar="images/jsa-128.jpg"
      />
      <CardTitle title={data.title} subtitle="Household Items" />
      <CardText>{data.description}</CardText>
    </Card>
  </div>
);

export default Item;
