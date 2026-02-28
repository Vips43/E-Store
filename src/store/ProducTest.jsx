import React, { useEffect } from "react";
import useMyStore from "./store";

function ProducTest({ uri, activeUser, fetchCart }) {
 const products = useMyStore((state) => state.products);
 const fetchData = useMyStore((state) => state.fetchData);

 useEffect(() => {
  fetchData();
 }, []);

 const addToCart = async (id) => {
  try {
   const res = await fetch(`${uri}/api/cart/add_to_cart`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
     product_id: id,
     quantity: 1,
     user_id: activeUser,
    }),
   });

   return await res.json();
  } catch (error) {
   console.error("add to cart error", error);
  }
 };

 const handleAdd = async (product) => {
  if (!activeUser) {
   alert("Please login first");
   return;
  }

  await addToCart(product.id);

  // Refresh cart from backend
  fetchCart(activeUser);
 };

 return (
  <div className="grid grid-cols-4 gap-4 mt-5">
   {products.map((pr) => (
    <div key={pr.id} className="p-2 shadow-md">
     <h3>{pr.title}</h3>
     <img src={pr.images[0]} alt="" className="w-20 h-20" />
     <button
      className="bg-yellow-400 border p-1 mt-2"
      onClick={() => handleAdd(pr)}
     >
      Add to Cart
     </button>
    </div>
   ))}
  </div>
 );
}

export default ProducTest;
