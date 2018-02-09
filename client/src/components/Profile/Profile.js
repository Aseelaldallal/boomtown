// React
import React from 'react';
// Items Container
import ItemCardList from '../Items/ItemCardList/ItemCardList';
// Styling
import classes from './Profile.css';

const Profile = props => {
  return (
    <div className="userProfileContainer">
      <div className="paperBox">
        <div className="item-a">
          <h1>{props.user.fullname}</h1>
          <p>{props.user.bio}</p>
        </div>
        <div className="item-b">
          <h3>{props.user.itemsowned.length}</h3>
          <p>Items shared</p>
        </div>
        <div className="item-c">
          <h3>{props.user.itemsborrowed.length}</h3>
          <p>Items borrowed</p>
        </div>
        <div className="item-d">
          <Gravatar className="paperGravatar" email={props.user.jwt.email} />
        </div>
      </div>
      <ItemCardList items={props.user.itemsowned} />
    </div>
  );
};

export default Profile;
