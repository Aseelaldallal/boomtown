import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button className={`button ${props.type}`} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
