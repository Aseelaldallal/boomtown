import React from 'react';
import cat404 from '../../images/cat404.svg';

const NotFound = () => {
  const styles = {
    heading: {
      backgroundColor: 'green',
      border: '2px solid orange',
      fontSize: '3rem',
      fontWeight: '400'
    }
  };
  return (
    <div>
      <img src={cat404} alt="404" />
      <h1 className={styles.heading}> NOPE</h1>
    </div>
  );
};

export default NotFound;
