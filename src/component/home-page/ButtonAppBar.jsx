import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";
import { useState } from "react";

export default function ButtonAppBar() {
 const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
 const logout = useAuthStore((s) => s.logout);
 const user = useAuthStore((s) => s.user);
 const navigate = useNavigate();

 const [open, setOpen] = useState(false);

 const handleLogout = () => {
  logout();
  navigate("/login");
 };

 const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Users", path: "/users" },
 ];

 return (
  <>
   <AppBar position="sticky" sx={{ top: 0, zIndex: 1200 }}>
    <Toolbar>
     {/* MOBILE MENU ICON */}
     <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2, display: { xs: "flex", md: "flex", sm:"none" } }}
      onClick={() => setOpen(true)}
     >
      <MenuIcon />
     </IconButton>

     {/* LOGO */}
     <Typography variant="h6" sx={{ flexGrow: 1 }}>
      E-Commerce
     </Typography>

     {/* DESKTOP LINKS */}
     <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
      {menuItems.map((item) => (
       <Link key={item.label} to={item.path}>
        <Button color="inherit">{item.label}</Button>
       </Link>
      ))}
     </Box>

     {/* CART */}
     <Button
      variant="contained"
      startIcon={<ShoppingCartTwoToneIcon />}
      sx={{ ml: 2 }}
     >
      Cart
     </Button>

     {/* AUTH */}
     {!isAuthenticated ? (
      <Link to="/login">
       <Button color="inherit">Login</Button>
      </Link>
     ) : (
      <Button color="inherit" onClick={handleLogout}>
       Logout ({user?.username})
      </Button>
     )}
    </Toolbar>
   </AppBar>

   {/* MOBILE DRAWER */}
   <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
    <Box sx={{ width: 250 }} role="presentation">
     <List>
      {menuItems.map((item) => (
       <ListItem key={item.label} disablePadding>
        <ListItemButton
         component={Link}
         to={item.path}
         onClick={() => setOpen(false)}
        >
         <ListItemText primary={item.label} />
        </ListItemButton>
       </ListItem>
      ))}

      <ListItem>
       {!isAuthenticated ? (
        <Button fullWidth variant="contained" component={Link} to="/login">
         Login
        </Button>
       ) : (
        <Button
         fullWidth
         variant="outlined"
         color="error"
         onClick={handleLogout}
        >
         Logout
        </Button>
       )}
      </ListItem>
     </List>
    </Box>
   </Drawer>
  </>
 );
}
