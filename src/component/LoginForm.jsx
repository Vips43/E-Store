import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useMyStore, { useAuthStore } from "../store/store";

const LoginForm = () => {
 const [user, setUser] = useState({ username: "", password: "" });
 const login = useAuthStore((s) => s.login);
 const role = useMyStore((state) => state.role);
 const fetchUsers = useMyStore((state) => state.fetchUsers);

 useEffect(() => {
  fetchUsers();
 }, []);

 const navigate = useNavigate();

 const handleLogin = async () => {
  try {
   const res = await axios.post("https://dummyjson.com/auth/login", {
    username: user.username,
    password: user.password,
   });

   // find logged-in user from users list
   const matchedUser = role.admin
    .concat(role.user, role.moderator)
    .find((u) => u.username === res.data.username);

   if (!matchedUser) {
    alert("User not found in users list");
    return;
   }

   // attach role manually
   const userWithRole = {
    ...res.data,
    role: matchedUser.role,
   };
   console.log(userWithRole);
   login(userWithRole);
   navigate("/");
  } catch (err) {
   alert("Invalid credentials");
  }
 };

 return (
  <Box
   height="100vh"
   display="flex"
   flexDirection="column"
   justifyContent="center"
   alignItems="center"
  >
   <Paper sx={{ p: 4, width: 350 }}>
    <Typography variant="h5" mb={2} textAlign="center">
     Admin Login
    </Typography>

    <TextField
     fullWidth
     label="Username"
     margin="normal"
     onChange={(e) =>
      setUser((prev) => ({ ...prev, username: e.target.value }))
     }
    />

    <TextField
     fullWidth
     label="Password"
     type="password"
     margin="normal"
     onChange={(e) =>
      setUser((prev) => ({ ...prev, password: e.target.value }))
     }
    />
    <span>show</span>
    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
     Login
    </Button>
   </Paper>
   <ul className="absolute h-20 overflow-auto left-5">
    {role.admin.map((a, i) => (
     <li key={i} className="list-disc">
      <span>{i + 1}</span>
      <p>
       <strong>Username: </strong>
       {a.username}
      </p>
      <p>
       <strong>Password: </strong>
       {a.password}
      </p>
     </li>
    ))}
   </ul>
  </Box>
 );
};

export default LoginForm;
