import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMyCart } from "../../../store/store";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import ProductCountBtns from "./ProductCountBtns";
import { useNavigate } from "react-router-dom";

function Cart() {
 const cartCount = useMyCart((s) => s.cartCount);
 const [anchorEl, setAnchorEl] = useState(null);
 const opened = Boolean(anchorEl); //for cart
 const navigate = useNavigate();

 const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
 };

 const CartItems = ({ anchorEl, opened, setAnchorEl }) => {
  const items = useMyCart((state) => state.items);
  console.log(items);
  const handleClose = () => {
   setAnchorEl(null);
  };
  const grossPrice = items
   .map((item) => item.count * item.product.price)
   .reduce((acc, curr) => acc + curr, 0)
   .toFixed(2);
  const discount = ((grossPrice * 18) / 100).toFixed(2);
  const totalPrice = grossPrice - discount;

  return (
   <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={opened}
    onClose={handleClose}
    slotProps={{
     paper: {
      elevation: 0,
      sx: {
       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
       mt: 1,
       width: 480,
       maxHeight: 450,
       overflow: "auto",
       px: 2,
       "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
       },
       "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
       },
      },
     },
    }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
   >
    {items.length > 0 ? (
     items?.map((item) => (
      <MenuItem
       key={item.id}
       disableRipple
       sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "1px 1px 5px grey",
       }}
      >
       <Box
        component="img"
        src={`${item.product.thumbnail}`}
        sx={{ width: 80, height: 80 }}
       />
       <Box sx={{ display: "grid", gap: 2, px: 1 }}>
        <Typography sx={{ display: "grid", lineHeight: 1 }}>
         <span className="text-base">{item.product.title}</span>
         <span className="text-sm text-neutral-500 line-clamp-1">
          {item.product.description}{" "}
         </span>
        </Typography>
        <div className="flex items-center justify-between">
         <ProductCountBtns
          mWidHei="20px"
          svgSize=".7rem"
          fontsize=".8rem"
          product={item}
         />
         <span className="text-sm font-bold">
          £ {item.product.price * item.count}
         </span>
        </div>
       </Box>
      </MenuItem>
     ))
    ) : (
     <p className="w-3xs h-20 text-center content-center">Cart is empty</p>
    )}
    <Box sx={{ mt: 3, mb: 1 }}>
     <Typography
      sx={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
      }}
     >
      <span className="font-semibold text-neutral-600 text-sm">
       Total Product Price
      </span>
      <span className="font-semibold text-sm">{grossPrice}</span>
     </Typography>
     <Typography
      sx={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
      }}
     >
      <span className="font-semibold text-neutral-600 text-sm">
       Discount(18%)
      </span>
      <span className="font-semibold text-sm">-{discount}</span>
     </Typography>
     <Typography
      sx={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
      }}
     >
      <span className="font-semibold text-neutral-600 text-sm">
       Total Checkout
      </span>
      <span className="font-semibold text-sm">{totalPrice}</span>
     </Typography>
     <Button
      variant="contained"
      sx={{ mx: "center", mt: 2 }}
      onClick={() => navigate("/payment")}
     >
      Proceed to Ckeckout
     </Button>
    </Box>
   </Menu>
  );
 };

 return (
  <>
   <Button
    variant="contained"
    id="basic-button"
    aria-controls={opened ? "basic-menu" : undefined}
    aria-haspopup="true"
    aria-expanded={opened ? "true" : undefined}
    onClick={handleClick}
    startIcon={<ShoppingCartTwoToneIcon />}
    sx={{ ml: 2 }}
   >
    Cart {cartCount}
   </Button>
   <CartItems opened={opened} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
  </>
 );
}

export default Cart;

const TotalValue = () => {};
