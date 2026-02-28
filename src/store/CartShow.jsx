import React, { useState } from "react";

function CartShow({ cart }) {
 const [pr, setPr] = useState([]);

 const getProductsById = async (ids) => {
  try {
   const promises = ids.map(async (id) => {
    const url = `http://localhost:3000/product/${id}`;
    const res = await fetch(url);
    if (!res.ok) console.log(res);
    return await res.json();
   });

   const products = await Promise.all(promises);
   setPr(products);
   console.log(products);
  } catch (error) {}
 };
 const handleclick = async () => {
//   if (cart.length === 0) return;
const ids = cart.map((c) => Number(c.product_id));
await getProductsById(ids);
console.log("clikced");
 };

 return (
  <>
   <div>
    <div className="border w-fit mx-auto my-5 px-3 py-1" onClick={handleclick} >
     Cart Items: {cart.length}
    </div>

    <div className="w-xl bg-gray-400 grid grid-cols-4">
     {pr.map((p) => (
      <div key={p.id}>
       <img src={`${p.images[0]}`} alt="" className="h-10"/>
       <h3>{p.title}</h3>
      </div>
     ))}
    </div>
   </div>
  </>
 );
}

export default CartShow;
