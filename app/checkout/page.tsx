"use client";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ltzfloharlymlreksszw.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0emZsb2hhcmx5bWxyZWtzc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMzIwMjQsImV4cCI6MjA5NjgwODAyNH0.nh-7IuqbinosrrHKbmsDgLiSpg8ccjGQgYrsM-DLxC4"
);

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {

  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");

  const [address, setAddress] = useState("");

  const [pincode, setPincode] = useState("");

  const handlePayment = async () => {

    if (!name || !mobile || !address || !pincode) {

      alert("Fill all fields");

      return;

    }

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: name,
          mobile: mobile,
          address: address,
          pincode: pincode,
        },
      ]);

    if (error) {

      alert("Database Error");

      console.log(error);

      return;

    }

    const options = {

      key: "rzp_test_T0nLa5KO6r76fG",

      amount: 129900,

      currency: "INR",

      name: "Srinivasa Dairy",

      description: "Premium Ghee Order",

      handler: function () {

        alert("Payment Successful");

      },

      theme: {

        color: "#1d2b22",

      },

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  };

  return (

    <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center p-8">

      <div className="bg-white p-10 rounded-[30px] w-full max-w-2xl shadow-2xl">

        <h1 className="text-4xl text-center mb-2 text-[#1d2b22]">

          Srinivasa Dairy

        </h1>

        <p className="text-center text-gray-500 mb-10">

          Premium Checkout

        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-4 rounded-xl outline-none"
          />

          <div className="flex items-center border rounded-xl overflow-hidden">

            <div className="px-4">
              🇮🇳 +91
            </div>

            <input
              type="tel"
              maxLength={10}
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value.replace(/\D/g, "")
                )
              }
              className="w-full p-4 outline-none"
            />

          </div>

          <textarea
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-4 rounded-xl outline-none h-32"
          />

          <input
            type="tel"
            maxLength={6}
            placeholder="Pincode"
            value={pincode}
            onChange={(e) =>
              setPincode(
                e.target.value.replace(/\D/g, "")
              )
            }
            className="w-full border p-4 rounded-xl outline-none"
          />

          <button
            onClick={handlePayment}
            className="w-full bg-[#1d2b22] text-white py-5 rounded-full text-lg"
          >

            Continue To Payment

          </button>

        </div>

      </div>

    </main>

  );

}
