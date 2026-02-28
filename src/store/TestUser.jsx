import { useEffect, useState } from "react";
import ProducTest from "./ProducTest";
import CartShow from "./CartShow";

const URI = `http://localhost:3000`;

function TestUser() {
 const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
 });

 const [loginForm, setLoginForm] = useState({
  email: "",
  password: "",
 });

 const [user, setUser] = useState([]);
 const [activeUser, setActiveUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null,
 );
 const [cart, setCart] = useState([]);

 // ---------------- SIGNUP ----------------
 const handleSignup = async (userData) => {
  try {
   const res = await fetch(`${URI}/api/users/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userData),
   });

   const data = await res.json();

   if (data?._id) {
    setUser((prev) => [...prev, data]);
   }

   setFormData({
    username: "",
    email: "",
    password: "",
   });
  } catch (error) {
   console.error("signup error", error.message);
  }
 };

 // ---------------- LOGIN ----------------
 const handleLogin = async (userData) => {
  try {
   const res = await fetch(`${URI}/api/users/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userData),
   });

   const data = await res.json();

   if (data?.user?._id) {
    setActiveUser(data.user._id);
    localStorage.setItem("user", JSON.stringify(data.user._id));
   }

   setLoginForm({ email: "", password: "" });
  } catch (error) {
   console.error("login error", error.message);
  }
 };

 // ---------------- FETCH CART ----------------
 const fetchCart = async (userId) => {
  try {
   const res = await fetch(`${URI}/api/cart/get_cart/${userId}`);
   const data = await res.json();

   if (Array.isArray(data)) {
    setCart(data);
    console.log(data);
   }
   console.log(data);
  } catch (error) {
   console.error("error fetching cart", error);
  }
 };

 // Fetch cart whenever user logs in
 useEffect(() => {
  if (activeUser) {
   fetchCart(activeUser);
   console.log("ACTIVE USER:", activeUser);
  }
 }, [activeUser]);

 // ---------------- FETCH USERS ----------------
 useEffect(() => {
  const getUsers = async () => {
   try {
    const res = await fetch(`${URI}/api/users/getUser`);
    const data = await res.json();

    if (Array.isArray(data)) setUser(data);
   } catch (error) {
    console.error("error fetching users", error);
   }
  };

  getUsers();
 }, []);

 // ---------------- HANDLERS ----------------
 const handleSignupSubmit = (e) => {
  e.preventDefault();
  handleSignup(formData);
 };

 const handleLoginSubmit = (e) => {
  e.preventDefault();
  handleLogin(loginForm);
 };

 return (
  <>
   {/* CART COUNT */}
   

   <CartShow cart={cart} />

   {/* FORMS */}
   <div className="flex justify-around items-center">
    {/* Signup */}
    <form
     onSubmit={handleSignupSubmit}
     className="grid mx-auto w-3xs border mt-5 gap-3 p-2"
    >
     <h3 className="text-center">Signup</h3>

     <input
      type="text"
      placeholder="Enter name"
      value={formData.username}
      onChange={(e) =>
       setFormData((prev) => ({
        ...prev,
        username: e.target.value,
       }))
      }
     />

     <input
      type="email"
      placeholder="Enter email"
      value={formData.email}
      onChange={(e) =>
       setFormData((prev) => ({
        ...prev,
        email: e.target.value,
       }))
      }
     />

     <input
      type="password"
      placeholder="Enter password"
      value={formData.password}
      onChange={(e) =>
       setFormData((prev) => ({
        ...prev,
        password: e.target.value,
       }))
      }
     />

     <button type="submit">Signup</button>
    </form>

    {/* Login */}
    <form
     onSubmit={handleLoginSubmit}
     className="grid mx-auto mt-5 w-3xs border gap-3 p-2"
    >
     <h3 className="text-center">Login</h3>

     <input
      type="email"
      placeholder="Enter email"
      value={loginForm.email}
      onChange={(e) =>
       setLoginForm((prev) => ({
        ...prev,
        email: e.target.value,
       }))
      }
     />

     <input
      type="password"
      placeholder="Enter password"
      value={loginForm.password}
      onChange={(e) =>
       setLoginForm((prev) => ({
        ...prev,
        password: e.target.value,
       }))
      }
     />

     <button type="submit">Login</button>
    </form>
   </div>

   {/* PRODUCTS */}
   <ProducTest uri={URI} activeUser={activeUser} fetchCart={fetchCart} />
  </>
 );
}

export default TestUser;
