import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import classes from "./TshirtCard.module.css";
import Link from "next/link";

const TshirtCard = ({ tshirt, width }) => {
  const tshirtLink = `/tshirt/${tshirt.id}`;
  const tshirtImage = `${tshirt.title.split(' ')[1].toLowerCase()}-${tshirt.color.toLowerCase()}.jpeg`

  return (
    <Link href={tshirtLink}>
      <Card className={classes.card} sx={{ width: { width } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            width="400"
            image={tshirtImage}
            alt={tshirt.title}
            style={{objectFit: 'contain', padding: 20}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tshirt.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.cardText}
            >
              {tshirt.price + "$"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default TshirtCard;
