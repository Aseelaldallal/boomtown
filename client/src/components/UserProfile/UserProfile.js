import React from 'react';
import Paper from 'material-ui/Paper';
import Gravatar from 'react-gravatar';
import './UserProfile.css';

const UserProfile = props => {
  const styles = {
    paper: {
      height: 200,
      width: '50vw',
      margin: 20
    }
  };
  console.log(props.match.params.userid);
  return (
    <Paper style={styles.paper} zDepth={2}>
      <Gravatar email="aseelaldallal@gmail.com" className="GravatarImg" />
    </Paper>
  );
};

export default UserProfile;
