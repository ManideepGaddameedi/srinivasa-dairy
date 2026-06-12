"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.pincode
    ) {

      alert("Please fill all fields");

      return;
    }

    if (form.mobile.length !== 10) {

      alert("Enter valid 10 digit mobile number");

      return;
    }

    if (form.pincode.length !== 6) {

      alert("Enter valid pincode");

      return;
    }

    try {

      setLoading(true);

      /* SAVE ORDER */
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: form.name,
            mobile: form.mobile,
            address: form.address,
            pincode: form.pincode,
          },
        ]);

      if (error) {

        console.log(error);

        alert("Failed To Save Order");

        return;
      }

      /* RAZORPAY */
      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: 129900,

        currency: "INR",

        name: "Srinivasa Dairy",

        description: "Premium Ghee Order",

        image:
          "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",

        handler: function (response: any) {

          alert("Payment Successful!");

          console.log(response);

        },

        prefill: {

          name: form.name,

          contact: form.mobile,

        },

        notes: {

          address: form.address,

        },

        theme: {

          color: "#1d2b22",

        },

      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

      setForm({
        name: "",
        mobile: "",
        address: "",
        pincode: "",
      });

    } catch (err) {

      console.log(err);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#f8f5ef] text-[#1d2b22]">

      {/* TOP BAR */}
      <div className="border-b border-[#ece4d8] bg-white/70 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

          <div>

            <h1 className="text-2xl tracking-[4px]">
              SRINIVASA DAIRY
            </h1>

            <p className="text-sm text-[#7b7468] mt-1">
              Premium Traditional Ghee
            </p>

          </div>

          <div className="text-sm text-[#7b7468]">
            Secure Checkout
          </div>

        </div>

      </div>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div>

          <p className="uppercase tracking-[5px] text-[#9b8662] text-sm mb-5">
            Delivery Details
          </p>

          <h2 className="text-6xl leading-[1.05]">

            Complete your <br />

            premium order.

          </h2>

          <p className="mt-8 text-[#6f675b] text-lg leading-[1.9] max-w-xl">

            Carefully packed traditional buffalo and cow ghee
            delivered fresh from Srinivasa Dairy to your doorstep.

          </p>

          {/* BENEFITS */}
          <div className="mt-14 space-y-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-[#1d2b22] text-white flex items-center justify-center text-xl">

                ✓

              </div>

              <div>

                <h3 className="text-xl">
                  Pure Traditional Quality
                </h3>

                <p className="text-[#7b7468] mt-1">
                  Crafted with authentic methods.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-[#1d2b22] text-white flex items-center justify-center text-xl">

                ✓

              </div>

              <div>

                <h3 className="text-xl">
                  Fresh Farm Delivery
                </h3>

                <p className="text-[#7b7468] mt-1">
                  Delivered safely to your home.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-[#1d2b22] text-white flex items-center justify-center text-xl">

                ✓

              </div>

              <div>

                <h3 className="text-xl">
                  Secure Payment
                </h3>

                <p className="text-[#7b7468] mt-1">
                  Razorpay protected checkout.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white border border-[#ece4d8] rounded-[40px] p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)]">

          <h3 className="text-4xl">
            Delivery Address
          </h3>

          <p className="mt-3 text-[#7b7468]">
            Enter your delivery information
          </p>

          <div className="mt-10 space-y-6">

            {/* NAME */}
            <div>

              <label className="text-sm text-[#7b7468]">
                Full Name
              </label>

              <input
                required
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Enter your full name"
                className="mt-2 w-full border border-[#e7dfd2] rounded-2xl px-5 py-4 outline-none focus:border-[#1d2b22]"
              />

            </div>

            {/* MOBILE */}
            <div>

              <label className="text-sm text-[#7b7468]">
                Mobile Number
              </label>

              <div className="mt-2 flex items-center border border-[#e7dfd2] rounded-2xl overflow-hidden focus-within:border-[#1d2b22]">

                <div className="px-5 py-4 bg-[#faf7f2] border-r border-[#e7dfd2] flex items-center gap-2">

                  <span className="text-xl">
                    🇮🇳
                  </span>

                  <p className="text-[#1d2b22]">
                    +91
                  </p>

                </div>

                <input
                  required
                  type="tel"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => {

                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {

                      setForm({
                        ...form,
                        mobile: value,
                      });

                    }

                  }}
                  placeholder="Enter 10 digit mobile number"
                  className="w-full px-5 py-4 outline-none bg-transparent"
                />

              </div>

            </div>

            {/* ADDRESS */}
            <div>

              <label className="text-sm text-[#7b7468]">
                Full Address
              </label>

              <textarea
                required
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                placeholder="House no, street, village, district..."
                className="mt-2 w-full border border-[#e7dfd2] rounded-2xl px-5 py-4 outline-none h-36 resize-none focus:border-[#1d2b22]"
              />

            </div>

            {/* PINCODE */}
            <div>

              <label className="text-sm text-[#7b7468]">
                Pincode
              </label>

              <input
                required
                type="tel"
                maxLength={6}
                value={form.pincode}
                onChange={(e) => {

                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 6) {

                    setForm({
                      ...form,
                      pincode: value,
                    });

                  }

                }}
                placeholder="Enter pincode"
                className="mt-2 w-full border border-[#e7dfd2] rounded-2xl px-5 py-4 outline-none focus:border-[#1d2b22]"
              />

            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-4 bg-[#1d2b22] text-white py-5 rounded-full text-lg hover:opacity-90 transition disabled:opacity-50"
            >

              {loading
                ? "Processing..."
                : "Continue To Payment"}

            </button>

          </div>

        </div>

      </section>

    </main>

  );
}