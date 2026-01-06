import { CardMedia } from "@mui/material";
import React from "react";

function PrImage({ item }) {
 return (
  <>
   <CardMedia
    component="img"
    image={item.images[0]}
    alt={item.title}
    sx={{ width: "17rem" }}
   />
  </>
 );
}

export default PrImage;
