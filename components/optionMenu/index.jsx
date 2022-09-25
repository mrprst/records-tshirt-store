import React, { useState, useEffect } from "react";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";

const OptionMenu = ({ tshirt }) => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const getOptions = (parameter) => {
    const setOptions = parameter === "Color" ? Color : Size;
    Object.keys(setOptions).forEach((option) => {
      const select = document.getElementById(`select${parameter}`);
      var el = document.createElement("option");
      el.textContent = option;
      el.value = option;
      select.appendChild(el);
    });
  };

  useEffect(() => {
    setColor(tshirt?.color);
    setSize(tshirt?.size)
  }, [tshirt]);

  useEffect(() => {
    getOptions("Color");
    getOptions("Size");
  }, []);

  const chooseColor = (e) => {
    setColor(e.target.value);
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <option>Choose a color</option>
      <select value={color} id="selectColor" onChange={chooseColor}></select>
      <option>Choose a size</option>
      <select value={size} id="selectSize" onChange={chooseSize}></select>
    </>
  );
};

export default OptionMenu;
