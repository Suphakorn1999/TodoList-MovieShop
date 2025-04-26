"use client";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import { useCartStore } from "@/stores/useCartStore";
import { showWarning } from "@/utils/swl";

export default function CheckoutModal({ totalPrice }: any) {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const { items } = useCartStore();

  useEffect(() => {
    if (!open) return;
    if (items.length === 0) {
      setOpen(false);
      showWarning("Warning", "Please add items to the cart before checkout.");
      return;
    }
    setTimeLeft(60);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOpen(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 hover:cursor-pointer mt-3"
        id="checkout-button"
      >
        💲Checkout
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <div className="fixed bg-white rounded-2xl p-6 w-[400px] shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            💳 Payment Method
          </h2>

          <div className="space-y-4">
            <div className="border p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bank Transfer</p>
                <p className="font-semibold text-gray-800">XX-123-45678</p>
              </div>
              <Button
                onClick={() => navigator.clipboard.writeText("XX-123-45678")}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              >
                Copy
              </Button>
            </div>

            <div className="border p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">PromptPay</p>
                <p className="font-semibold text-gray-800">080-123-4567</p>
              </div>
              <Button
                onClick={() => navigator.clipboard.writeText("080-123-4567")}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              >
                Copy
              </Button>
            </div>

            <div className="border p-3 rounded-lg flex items-center gap-3">
              <div>
                <p className="text-sm text-gray-600">Scan QR</p>
                <p className="font-semibold text-gray-800">
                  PromptPay / Bank App
                </p>
              </div>
            </div>

            <p className="text-center mt-4 font-bold text-red-600">
              ⏳ Time left {timeLeft}s
            </p>

            <div className="flex justify-between items-center font-semibold text-lg text-gray-800 border-t pt-4 mt-4">
              <span>Total</span>
              <span>฿ {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
