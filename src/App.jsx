import { Route, Routes } from "react-router-dom";
import Dash from "./component/Dash";
import LoginForm from "./component/LoginForm";
import Users from "./component/Users";
import FullUserDetails from "./component/FullUserDetails";
import ProductCard from "./component/ProductCard";
import Layout from "./component/home page/Layout";
import AdminRoute from "./component/oth compo/routes/AdminRoute";
import ProductDetails from "./component/ProductDetails";

function App() {
 return (
  <div>
   <Routes>
    <Route element={<Layout />}>
     <Route path="/" element={<Dash />} />
     <Route path="/login" element={<LoginForm />} />
     <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
     <Route path="/users/:id" element={<FullUserDetails />} />
     <Route path="/product" element={<ProductCard />} />
     <Route path="/product/:title" element={<ProductDetails />} />
    </Route>
   </Routes>
  </div>
 );
}

export default App;
