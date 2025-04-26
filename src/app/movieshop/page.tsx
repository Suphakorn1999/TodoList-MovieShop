"use client";
import { useEffect, useState } from "react";
import { searchMovie } from "@/api/tmdb";
import { Button } from "@headlessui/react";
import { useCartStore } from "@/stores/useCartStore";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import MovieCard from "@/components/MovieCard";
import CheckoutModal from "@/components/CheckoutModal";

export default function MovieShop() {
  const [openModal, setOpenModal] = useState(false);
  const [movies, setMovies] = useState<{ id: number; [key: string]: any }[]>(
    []
  );
  const [query, setQuery] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { items, removeItem, increasequantity, removequantity } =
    useCartStore();

  const fetchMovies = async () => {
    const res = await searchMovie(query);
    setMovies(res.data.results);
    setOpenModal(true);
  };

  function updatetotalPrice() {
    const totalItems = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    console.log("totalItems", totalItems);
    let discount = 0;
    if (totalItems > 5 || totalQuantity > 5) {
      discount = 0.2;
    } else if (totalItems > 3 || totalQuantity > 3) {
      discount = 0.1;
    }

    console.log("discount", discount);

    const subTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalPrice = subTotal - subTotal * discount;

    setSubTotal(subTotal);
    setDiscount(discount);
    setTotalPrice(totalPrice);
  }

  useEffect(() => {
    updatetotalPrice();
  }, [items]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 relative">
        <h1 className="text-4xl font-bold mb-8">🎞️ Find Your Movie</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="border rounded-lg p-2 w-80 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            onClick={fetchMovies}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:cursor-pointer"
          >
            🔍 Search
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg px-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} openModal={openModal} />
          ))}
        </div>

        <div className="fixed top-[5%] right-[1.5%] h-[90%] w-95 bg-white flex flex-col rounded-lg shadow-lg p-4 border border-gray-300">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">🛒 Cart</h2>
            <span className="text-sm text-gray-500">{items.length} items</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-10">
                Your cart is empty.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ฿ {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => increasequantity(item.id)}
                        className="hover:cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-300 border-gray-300 border"
                      >
                        <FaPlus size={11} className="text-gray-700" />
                      </button>
                      <span className="text-sm text-gray-700 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => removequantity(item.id)}
                        className="hover:cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-300 border-gray-300 border"
                      >
                        <FaMinus size={11} className="text-gray-700" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hover:cursor-pointer rounded-full p-1 bg-red-200 hover:bg-red-300 border-red-300 border"
                      >
                        <FaTrash size={11} className="text-red-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between font-medium text-gray-800 mb-1">
              <span>Subtotal</span>
              <span>฿ {subTotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600 mb-1">
                <span>Discount ({discount * 100}%)</span>
                <span>- ฿ {(subTotal * discount).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-gray-800 mt-2">
              <span>Total</span>
              <span>฿ {totalPrice.toLocaleString()}</span>
            </div>

            <CheckoutModal totalPrice={totalPrice.toLocaleString()}/>
          </div>
        </div>
      </div>
    </>
  );
}
