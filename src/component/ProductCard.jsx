import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Chip, Box, Rating } from "@mui/material";

export default function ProductCard({ pr }) {
 return (
  <Card sx={{ display: "flex", gap: 2, p: 2, transition: "0.2s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6, }, }} >
   {/* LEFT IMAGE */}
   <CardMedia component="img" image={pr.images[0]} alt={pr.title} 
   sx={{
     width: 140,
     height: 140,
     objectFit: "contain",
     flexShrink: 0,
    }}
   />

   {/* RIGHT CONTENT */}
   <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    {/* Title */}
    <Box sx={{ width: { xs: "100%", sm: 320 }, overflow: "hidden", wordBreak: "break-word", }} >
     <Typography variant="subtitle1" fontWeight="bold" noWrap>
      {pr.title}
     </Typography>
     <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Chip
       label={pr.category}
       size="small"
       variant="outlined"
       sx={{ mt: 0.5, textTransform: "capitalize" }}
      />
      <Typography variant="body2">{pr.brand}</Typography>
     </Box>

     <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient:  "vertical", overflow: "hidden", }} >
      {pr.description}
     </Typography>
    </Box>

    {/* Price + Rating */}
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5, }} >
     <Box sx={{ display: "flex", gap: "1rem", alignItems: "center", color: "green", }} >
      <Box
      sx={{ display: "flex" }}>
       <CurrencyPoundIcon fontSize="small" />
       <Typography fontWeight="bold">{pr.price}</Typography>
      </Box>
      <Typography sx={{ color: "grey", fontSize: ".75rem" }}>
       {pr.discountPercentage}%
      </Typography>
     </Box>

     <Box
      sx={{
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       color: "#f59e0b",
      }}
     >
      <Rating value={pr.rating} precision={0.5} readOnly size="small" />
     </Box>
    </Box>

    {/* Stock / Footer */}
    <CardActions sx={{ px: 0, mt: "auto" }}>
     {pr.stock <= 10 ? (
      <Chip
       label={`Low Stock: ${pr.stock}`}
       color="error"
       size="small"
       variant="outlined"
      />
     ) : (
      <Typography
       variant="caption"
       sx={{ display: "flex", alignItems: "center" }}
      >
       <InventoryIcon sx={{ fontSize: 16, mr: 0.5 }} />
       {pr.stock} in stock
      </Typography>
     )}
    </CardActions>
   </Box>
  </Card>
 );
}
