"use client";
import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@headlessui/react";
import { FaStar  } from "react-icons/fa";

export default function MovieCard({ movie }: any) {
  const addItem = useCartStore((state) => state.addItem);
  const [price, setPrice] = useState(0);

  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-2xl p-4 shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl w-40 h-60 object-cover"
      />
      <h2 className="mt-4 text-lg font-semibold text-gray-800 text-center">
        {movie.title}
      </h2>
      <div className="flex items-center space-x-1 text-yellow-500">
        <FaStar  size={16} fill="currentColor" className="text-yellow-500" />
        <span className="text-sm text-gray-800">{movie.vote_average}</span>
      </div>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border border-gray-300 rounded-lg p-2 w-full mt-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        placeholder="Set price (THB)"
        min="0"
      />

      <Button
        onClick={() =>
          addItem({ id: movie.id, title: movie.title, price, quantity: 1 })
        }
        className="mt-3 w-full bg-green-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
      >
        Add to Cart
      </Button>
    </div>
  );
}
