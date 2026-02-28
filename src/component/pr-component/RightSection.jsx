import { Box,Chip, Typography } from "@mui/material";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import Rating from "@mui/material/Rating";
import ProductCountBtns from "../home-page/cart/ProductCountBtns";

function RightSection({ item }) {
 return (
  <>
   <Typography gutterBottom variant="h5" component="div">
    {item.title}
   </Typography>
   <Box>
    <Chip
     label={item.category}
     size="small"
     variant="outlined"
     sx={{ my: 0.5, textTransform: "capitalize" }}
    />
   </Box>

   <Box
    sx={{
     display: "grid",
     gap: ".1rem",
     alignItems: "center",
     color: "green",
     mb: 2,
    }}
   >
    <Rating value={item.rating} precision={0.5} readOnly size="small" />
    <Box sx={{ display: "flex" }}>
     <CurrencyPoundIcon fontSize="small" />
     <Typography fontWeight="bold">{item.price}</Typography>
    </Box>
    <Typography sx={{ color: "grey", fontSize: ".75rem" }}>
     You save {item.discountPercentage}% right now
    </Typography>
   </Box>

   <ProductCountBtns product={item}/>

   <Box sx={{ marginTop: 3 }}>
    <Typography sx={{ color: "grey", fontSize: ".85rem" }}>
     {item.tags.map((t) => t).join(", ")}
    </Typography>
    <Typography sx={{ color: "grey", fontSize: ".85rem" }}>
     {item.availabilityStatus}
    </Typography>
   </Box>
  </>
 );
}

export default RightSection;
