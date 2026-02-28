import { Button, ButtonGroup, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMyCart } from "../../../store/store";

function ProductCountBtns({
 mWidHei = "27px",
 fontsize = "1rem",
 svgSize = "1.2rem",
 product,
}) {
 const cartCount = useMyCart((state) => state.cartCount);
 const addCartCount = useMyCart((state) => state.addCartCount);
 const minCartCount = useMyCart((state) => state.minCartCount);
 const removeCartItems = useMyCart((state) => state.removeCartItems);
 const items = useMyCart((state) => state.items);

 const labelCount = items?.find((item) => item?.id === product.id);

 console.log("labelCount: ", labelCount);

 let active = cartCount === 0;

 function handleAdd() {
  addCartCount(product);
 }
 function handleMin() {
  minCartCount(product.id);
 }

 return (
  <ButtonGroup
   size="small"
   variant="contained"
   sx={{
    width: "fit-content",
    height: "fit-content",

    "& .MuiButton-root": {
     minWidth: mWidHei,
     height: mWidHei,
     padding: 0,
    },
    "& .MuiSvgIcon-root": {
     fontSize: svgSize,
    },
   }}
  >
   <Button disabled={active} onClick={handleMin}>
    <RemoveIcon />
   </Button>

   <Typography
    sx={{
     width: 30,
     display: "grid",
     placeItems: "center",
     fontSize: fontsize,
    }}
   >
    {labelCount?.count || 0}
   </Typography>

   <Button onClick={handleAdd}>
    <AddIcon />
   </Button>

   {/* Delete Button with custom styling */}
   {!active ? (
    <Button
     sx={{
      ml: 2,
      bgcolor: "white",
      color: "red",
      "&:hover": { bgcolor: "#f5f5f5" },
     }}
     onClick={() => removeCartItems(product.id)}
    >
     <DeleteIcon />
    </Button>
   ) : (
    ""
   )}
  </ButtonGroup>
 );
}

export default ProductCountBtns;
