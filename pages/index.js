import React, { useState, useEffect } from "react";
import TshirtCard from "../components/tshirtcard/index";
import prisma from "../lib/prisma.ts";
import classes from "../styles/Home.module.css";

export default function ProductPage({ tshirts }) {
  Object.values(tshirts).forEach((value) => console.log(value[0].id));

  let arr = ["A", "B", "C"];
  return (
    <>
      <div className={classes.cards}>
        {Object.keys(tshirts).map((name, i) => (
          <div key={i}>
            <TshirtCard width="80%" tshirt={tshirts[name][0]} />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const amadou = await prisma.tshirt.findMany({
    where: {
      title: "Tshirt Amadou",
      color: "YELLOW",
      size: "S",
    },
  });
  const dao = await prisma.tshirt.findMany({
    where: {
      title: "Tshirt Dao",
      color: "WHITE",
      size: "S",
    },
  });
  const electric = await prisma.tshirt.findMany({
    where: {
      title: "Tshirt Electric",
      color: "PURPLE",
      size: "S",
    },
  });
  const maalem = await prisma.tshirt.findMany({
    where: {
      title: "Tshirt Maalem",
      color: "BLACK",
      size: "S",
    },
  });
  return {
    props: {
      tshirts: { amadou, dao, electric, maalem },
    },
  };
}
