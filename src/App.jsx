import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Dash from "./component/Dash";
import LoginForm from "./component/LoginForm";
import Users from "./component/Users";
import FullUserDetails from "./component/FullUserDetails";
import Layout from "./component/home-page/Layout";
import AdminRoute from "./component/oth-compo/routes/AdminRoute";
import About from "./component/About";
import SuspenseLoader from "./component/oth-compo/SuspenseLoader";

const ProductCard = lazy(() => import("./component/ProductCard"));
const ProductDetails = lazy(() => import("./component/ProductDetails"));
const PaymentPage = lazy(() => import("./component/payment/PaymentPage"));

function App() {
 return (
  <div>
   <Routes>
    <Route element={<Layout />}>
     <Route path="/" element={<Dash />} />
     <Route path="/about" element={<About />} />
     <Route path="/login" element={<LoginForm />} />
     <Route
      path="/users"
      element={
       <AdminRoute>
        <Users />
       </AdminRoute>
      }
     />
     <Route path="/users/:id" element={<FullUserDetails />} />
     <Route
      path="/product"
      element={
       <Suspense fallback={<SuspenseLoader />}>
        <ProductCard />
       </Suspense>
      }
     />
     <Route
      path="/product/:title"
      element={
       <Suspense fallback={<SuspenseLoader />}>
        <ProductDetails />
       </Suspense>
      }
     />
     <Route
      path="/payment"
      element={
       <Suspense fallback={<SuspenseLoader />}>
        <PaymentPage />
       </Suspense>
      }
     />
     {/* <Route path="/test" element={<TestUser />} /> */}
    </Route>
   </Routes>
  </div>
 );
}

export default App;
