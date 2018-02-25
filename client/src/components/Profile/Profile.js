// React
import React from 'react';
// Items Container
import ItemCardList from '../Items/ItemCardList/ItemCardList';
// Gravatar
import Gravatar from 'react-gravatar';
// Styling
import './Profile.css';

const Profile = props => {
  return (
    <div className="userProfileContainer">
      <div className="paperBox">
        <div className="item-a">
          <h1>{props.user.fullname}</h1>
          <p className="bio">{props.user.bio}</p>
        </div>
        <div className="item-b">
          <h3>{props.user.itemsowned.length}</h3>
          <p>Items shared</p>
        </div>
        <div className="item-c">
          <h3>{props.numItemsBorrowed}</h3>
          <p>Items borrowed</p>
        </div>
        <div className="item-d">
          <Gravatar className="paperGravatar" email={props.user.jwt.email} />
        </div>
      </div>
      <ItemCardList items={props.itemsowned} />
    </div>
  );
};

export default Profile;
