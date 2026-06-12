"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Buffalo Ghee",
    weight: "0.25 KG",
    price: 325,
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600",
  },

  {
    id: 2,
    name: "Buffalo Ghee",
    weight: "0.50 KG",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600",
  },

  {
    id: 3,
    name: "Buffalo Ghee",
    weight: "0.75 KG",
    price: 975,
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600",
  },

  {
    id: 4,
    name: "Buffalo Ghee",
    weight: "1 KG",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600",
  },

  {
    id: 5,
    name: "Cow Ghee",
    weight: "0.25 KG",
    price: 325,
    image:
      "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=1600",
  },

  {
    id: 6,
    name: "Cow Ghee",
    weight: "0.50 KG",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=1600",
  },

  {
    id: 7,
    name: "Cow Ghee",
    weight: "0.75 KG",
    price: 975,
    image:
      "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=1600",
  },

  {
    id: 8,
    name: "Cow Ghee",
    weight: "1 KG",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=1600",
  },
];

export default function Home() {

  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const addToCart = (product: any) => {

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {

      const updatedCart = cart.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }

  };

  const decreaseQuantity = (productId: number) => {

    const updated = cart
      .map((item) =>

        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);

  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (

    <main className="bg-[#f8f5ef] text-[#1d2b22] min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#f8f5ef]/90 backdrop-blur-xl border-b border-[#ece4d8]">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl tracking-[4px]">
              SRINIVASA DAIRY
            </h1>

            <p className="text-sm text-[#7b7468] mt-1">
              Pure Traditional Ghee
            </p>

          </div>

          <button
            onClick={() => setOpenCart(true)}
            className="border border-[#d8cbb7] px-6 py-3 rounded-full text-sm hover:bg-[#1d2b22] hover:text-white transition"
          >

            Cart ({totalItems})

          </button>

        </div>

      </nav>

      {/* HERO */}
      <section className="pt-36 pb-20">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[5px] text-[#9b8662] text-sm mb-6">
              Premium Traditional Dairy
            </p>

            <h1 className="text-6xl md:text-7xl leading-[1.05]">

              Pure handcrafted <br />

              buffalo & cow ghee.

            </h1>

            <p className="mt-8 text-lg text-[#6f675b] leading-[1.9] max-w-xl">

              Crafted with authentic traditional methods,
              rich aroma, and natural purity from Srinivasa Dairy.

            </p>

          </div>

          <div>

            <div className="rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

              <img
                src="https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1600"
                className="h-[700px] w-full object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-8 pb-28">

        <div className="mb-16">

          <p className="uppercase tracking-[5px] text-[#9b8662] text-sm">
            Our Collection
          </p>

          <h2 className="text-5xl mt-4">
            Signature Products
          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-[30px] overflow-hidden border border-[#ece4d8] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition"
            >

              <div className="overflow-hidden">

                <img
                  src={product.image}
                  className="h-[320px] w-full object-cover hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl">
                  {product.name}
                </h3>

                <p className="mt-2 text-[#7b7468]">
                  {product.weight}
                </p>

                <p className="mt-5 text-3xl">
                  ₹{product.price}
                </p>

                {cart.find((item) => item.id === product.id) ? (

                  <div className="mt-6 flex items-center justify-between bg-[#1d2b22] text-white rounded-full px-5 py-3">

                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="text-2xl"
                    >

                      -

                    </button>

                    <p>

                      {
                        cart.find(
                          (item) => item.id === product.id
                        )?.quantity
                      }

                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="text-2xl"
                    >

                      +

                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-6 w-full bg-[#1d2b22] text-white py-3 rounded-full hover:opacity-90 transition"
                  >

                    Add To Cart

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* SIDE CART */}
      {openCart && (

        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

          <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl">
                Your Cart
              </h2>

              <button
                onClick={() => setOpenCart(false)}
                className="text-3xl"
              >

                ×

              </button>

            </div>

            <div className="mt-8 space-y-5">

              {cart.length === 0 && (
                <p className="text-[#7b7468]">
                  Cart is empty
                </p>
              )}

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-5"
                >

                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover rounded-2xl"
                  />

                  <div className="flex-1">

                    <h3 className="text-xl">
                      {item.name}
                    </h3>

                    <p className="text-[#7b7468] mt-1">
                      {item.weight}
                    </p>

                    <p className="mt-2 text-xl">
                      ₹{item.price}
                    </p>

                    <div className="mt-4 flex items-center gap-4">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-[#1d2b22] text-white w-8 h-8 rounded-full"
                      >

                        -

                      </button>

                      <p>{item.quantity}</p>

                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#1d2b22] text-white w-8 h-8 rounded-full"
                      >

                        +

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-10">

              <div className="flex items-center justify-between text-2xl">

                <p>Total</p>

                <p>₹{totalPrice}</p>

              </div>

              <Link href="/checkout">

                <button className="mt-6 w-full bg-[#1d2b22] text-white py-4 rounded-full text-lg hover:opacity-90 transition">

                  Checkout

                </button>

              </Link>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="border-t border-[#ece4d8] py-14 text-center">

        <h3 className="text-2xl tracking-[4px]">
          SRINIVASA DAIRY
        </h3>

        <p className="mt-4 text-[#6f675b]">
          7-29, Tadoor, Nagarkurnool, Telangana
        </p>

      </footer>

    </main>

  );
}