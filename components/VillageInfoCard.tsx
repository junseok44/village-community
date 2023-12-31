import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VillageImage from "../public/village.jpg";
import Image from "next/image";

interface VillageInfoCardProps {
  title: string;
  description: string;
}

const VillageInfoCard = ({ title, description }: VillageInfoCardProps) => {
  return (
    <Card sx={{ flexShrink: 0 }}>
      <Image
        src={VillageImage}
        alt="picture of village"
        placeholder="blur"
      ></Image>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default VillageInfoCard;
