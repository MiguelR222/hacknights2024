"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import convertToSubcurrency from "@/lib/convert-to-subcurrency";

const CheckoutPage = ({ amount, listingId }: { amount: number; listingId: string }) => {
  const stripe = useStripe();

  console.log('this is the amount', amount)
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // const createPaymentIntent = async () => {
  //   try {
  //     const response = await fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: convertToSubcurrency(amount),
  //         metadata: {
  //           listingId,
  //           userId: session?.user.id,
  //         },
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setClientSecret(data.clientSecret);
  //     } else {
  //       setErrorMessage(data.error || "Failed to create payment intent");
  //     }
  //   } catch (error) {
  //     setErrorMessage("An error occurred while creating payment intent");
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !session?.user.id || !listingId || !amount) {
      return;
    }

    // Create the payment intent when the user submits the form
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        metadata: {
          listingId,
          userId: session?.user.id,
        },
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setClientSecret(data.clientSecret);
    } else {
      setErrorMessage(data.error || "Failed to create payment intent");
    }


    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!listingId || !amount){
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
