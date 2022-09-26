import React, { useEffect } from "react";
import { Color } from "@prisma/client";
import { Size } from "@prisma/client";

const OptionMenu = ({ color, size, handleColor, handleSize }) => {
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
    getOptions("Color");
    getOptions("Size");
  }, []);

  return (
    <>
      <h5>
        <option>Choose a color</option>
      </h5>
      <select
        value={color}
        id="selectColor"
        onChange={(e) => handleColor(e.target.value)}
      ></select>
      <h5>
        <option>Choose a size</option>
      </h5>
      <select
        value={size}
        id="selectSize"
        onChange={(e) => handleSize(e.target.value)}
      ></select>
    </>
  );
};

export default OptionMenu;
