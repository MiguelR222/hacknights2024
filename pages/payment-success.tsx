'use client';

import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  if (!amount) {
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-[#555B6E]">
        <h1 className="text-4xl font-extrabold mb-2">Error</h1>
        <p className="text-xl">Amount parameter is missing or invalid.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-black text-center border m-10 rounded-md bg-[#BEE3DB]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Gracias por tu compra!</h1>
        <h2 className="text-2xl">Puedes pasar a recoger el objeto en nuestro almacen</h2>

        <div className="bg-white p-2 rounded-md text-black mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </main>
  );
}
