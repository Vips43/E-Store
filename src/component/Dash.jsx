import ProductCard from "./ProductCard";
import useMyStore from "../store/store";
import { useNavigate } from "react-router-dom";
import BasicPagination from "./oth-compo/BasicPagination";
import { useEffect } from "react";
import SearchAppBar from "./oth-compo/SearchAppBar";

function Dash() {
 const products = useMyStore((state) => state.products);
 const fetchData = useMyStore((state) => state.fetchData);
 const selectValue = useMyStore((s) => s.selectValue);
 const navigate = useNavigate();

 useEffect(() => {
  fetchData(1, 10);
 }, [selectValue]);


 return (
  <div className="min-h-screen bg-gray-100 pb-10">
   <div className="mb-5">
    <SearchAppBar />
   </div>
   <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {products.map((pr) => (
      <div key={pr.id} onClick={() => navigate(`/product/${pr.title}`)}>
       <ProductCard pr={pr} />
      </div>
     ))}
    </div>

    <div className="flex justify-center my-5">
     <BasicPagination />
    </div>
   </div>
  </div>
 );
}

export default Dash;
