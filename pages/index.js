import React from 'react';
import TshirtCard from '../components/tshirtcard/TshirtCard';
import prisma from '../lib/prisma.ts';
import classes from '../styles/Home.module.css';

export default function ProductPage({ tshirts }) {
  return (
    <div>
      Hello
      <div className={classes.cards}>
        {tshirts?.map((tshirt, i) => (
          <div>
            <TshirtCard width="80%" tshirt={tshirt} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const allTshirts = await prisma.tshirt.findMany({
    take: 6,
    orderBy: [
      {
        title: 'asc',
      },
    ],
  });
  return {
    props: {
      tshirts: allTshirts,
    },
  };
}
