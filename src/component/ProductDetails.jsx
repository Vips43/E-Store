import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PrImage from "./pr-component/PrImage";
import RightSection from "./pr-component/RightSection";
import { Box, CardContent } from "@mui/material";
import LeftSection from './pr-component/LeftSection'

export default function ProductDetails() {
 const [item, setItem] = useState(null);
 document.title = "Product | details";
 const { title } = useParams();

 useEffect(() => {
  const getData = async () => {
   const res = await fetch(`https://dummyjson.com/products/search?q=${title}`);
   const data = await res.json(); 
   localStorage.setItem("prdetails", JSON.stringify(data));
   setItem(data.products?.[0] || null);
  };
    getData()
 }, [title]);

 if (!item) {
  return <p className="mx-auto my-10 p-5 text-2xl">Loading...</p>;
 }

 return (
  <Card> 
   <Box>
    <Box
     sx={{
      display: "flex",
      maxWidth: "60rem",
      gap: "1rem",
      margin: "1rem auto",
      padding: ".5rem",
     }}
    >
     <PrImage item={item} /> {/*image component*/}
     <CardContent sx={{ maxWidth: 600 }}>
      <RightSection item={item} />
     </CardContent>
    </Box>
    <Box>
     <LeftSection item={item} />
    </Box>
   </Box>
  </Card>
 );
}
