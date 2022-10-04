import React from 'react';
import classes from './sizeButton.module.css'

const SizeButton = ({size, handleSize, active}) => {

  return (
    <button className={`${classes.size} ${size === active ? classes.activeSize : null}`} onClick={() => handleSize(size)}>
      {size}
    </button>
  );
}

export default SizeButton;
