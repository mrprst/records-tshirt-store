import React, { useEffect } from "react";
import classes from "./OptionMenu.module.css";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";
import ColorButton from "../colorButton/index";
import SizeButton from "../sizeButton/index";

const OptionMenu = ({ color, size, handleColor, handleSize }) => {
  const getColors = () => {
    let allColors = [];
    Object.keys(Color).forEach((option, index) => {
      allColors.push(
        <ColorButton
          key={index}
          color={option}
          active={color}
          handleColor={handleColor}
        />
      );
    });
    return allColors;
  };

  const getSizes = () => {
    let allSizes = [];
    Object.keys(Size).forEach((option, index) => {
      allSizes.push(
        <SizeButton
          key={index}
          size={option}
          active={size}
          handleSize={handleSize}
        />
      );
    });
    return allSizes;
  };

  return (
    <div className={classes.container}>
      <h5>COLOR</h5>
      <div className={classes.option}>{getColors()}</div>
      <h5>SIZE </h5>
      <div className={classes.option}>{getSizes()}</div>
    </div>
  );
};

export default OptionMenu;
