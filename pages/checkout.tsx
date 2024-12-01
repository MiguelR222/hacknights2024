"use client";

import CheckoutPage from "@/components/checkout-page";
import convertToSubcurrency from "@/lib/convert-to-subcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listingId");
  const [amount, setAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (!listingId) {
      setErrorMessage("Listing ID is required");
      return;
    }

    const fetchAmount = async () => {
      try {
        const response = await fetch(`/api/listings?listingId=${listingId}`);
        const data = await response.json();
        if (response.ok && data.success) {
          setAmount(data.data.price); // Assuming the price field is in `data.data`
        } else {
          setErrorMessage(data.error || "Failed to fetch listing amount");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching listing amount");
      }
    };

    fetchAmount();
  }, [listingId]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>
      {(listingId && amount) && 
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "mxn",
        }}
      >
        <CheckoutPage amount={amount} listingId={listingId} />
        </Elements>
      }
    </main>
  );
}