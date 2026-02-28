import React, { useEffect } from "react";
import axios from "axios";

const PaymentPage = () => {
 useEffect(() => {
  loadScript("https://checkout.razorpay.com/v1/checkout.js");
 }, []);

 const displayRazorpay = async () => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
   alert("Razorpay SDK failed to load. Are you online?");
   return;
  }

  try {
   const orderResponse = await axios.post(
    "http://localhost:5000/api/payment/create-order",
    {
     amount: 500, // Example amount
     currency: "INR",
    },
   );

   const { id: order_id, amount, currency } = orderResponse.data;

   // 2. Configure the options for the Razorpay popup
   const options = {
    key: "YOUR_RAZORPAY_KEY_ID",
    amount: amount,
    currency: currency,
    name: "Your Business Name",
    description: "Test Transaction",
    order_id: order_id,
    handler: function (response) {
     alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
    },
    prefill: {
     name: "John Doe",
     email: "john.doe@example.com",
     contact: "9999999999",
    },
    theme: {
     color: "#3399cc",
    },
   };

   // 3. Open the Razorpay payment modal
   const paymentObject = new window.Razorpay(options);
   paymentObject.open();
  } catch (error) {
   console.error("Payment initiation failed:", error);
   alert("Payment initiation failed. Please try again.");
  }
 };

 return (
  <div>
   <button onClick={displayRazorpay}>Pay Now</button>
  </div>
 );
};

export default PaymentPage;
