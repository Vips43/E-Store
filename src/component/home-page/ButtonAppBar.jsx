import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

export default function ButtonAppBar() {
 const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
 const logout = useAuthStore((s) => s.logout);
 const user = useAuthStore((s) => s.user);
 const navigate = useNavigate();

 const handleLogout = () => {
  logout();
  navigate("/login");
 };

 return (
  <AppBar position="sticky" sx={{ top: 0, zIndex: 1200 }}>
   <Toolbar>
    <IconButton
     size="large"
     edge="start"
     color="inherit"
     aria-label="menu"
     sx={{ mr: 2 }}
    >
     <MenuIcon />
    </IconButton>

    <Typography variant="h6" sx={{ flexGrow: 1 }}>
     E-Commerce
    </Typography>

    <Box>
     <Link to={`/`}>
      <Button color="inherit">Home</Button>
     </Link>
     <Button color="inherit">About</Button>
     <Link to={`/users`}>
      <Button color="inherit">Users</Button>
     </Link>
    </Box>
    <Button variant="contained" startIcon={<ShoppingCartTwoToneIcon />}>
      Cart
    </Button>
    {!isAuthenticated ? (
     <Link to="/login">
      <Button color="inherit">Login</Button>
     </Link>
    ) : (
     <Button color="inherit" onClick={handleLogout}>
      Logout ({JSON.parse(localStorage.getItem("login")) || user?.username})
     </Button>
    )}
   </Toolbar>
  </AppBar>
 );
}
