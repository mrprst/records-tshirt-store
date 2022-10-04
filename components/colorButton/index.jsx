import React from 'react';
import classes from './colorButton.module.css'

const ColorButton = ({color, handleColor, active}) => {


  return (
    <button className={`${classes.color} ${color === active ? classes.activeColor : null}`} style={{backgroundColor: color}} onClick={() => handleColor(color)}>
    </button>
  );
}

export default ColorButton;
