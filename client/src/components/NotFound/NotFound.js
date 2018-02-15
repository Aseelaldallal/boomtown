import React from 'react';
import cat404 from '../../images/cat404.svg';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notFound">
      <img src={cat404} alt="404" />
      <h1> NOPE</h1>
    </div>
  );
};

export default NotFound;
