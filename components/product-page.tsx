'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

interface Component {
  name: string;
  description: string;
  quantity: number;
}

interface Listing {
  _id: string; // MongoDB uses `_id` by default
  name: string;
  price: number;
  description: string;
  category: string;
  components: Component[];
  imageUrl: string;
}

// Fetch listing from API endpoint
async function fetchListing(listingId: string): Promise<Listing | null> {
  const res = await fetch(`/api/listings?listingId=${listingId}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.success ? data.data : null;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const listingId = searchParams.get('listingId');
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadListing() {
      if (listingId) {
        const fetchedListing = await fetchListing(listingId);
        setListing(fetchedListing);
      }
      setIsLoading(false);
    }

    loadListing();
  }, [listingId]);

  const handleCheckout = () => {
    if (listing) {
      router.push(`/checkout?listingId=${listing._id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F9] flex items-center justify-center">
        <div className="text-2xl text-[#555B6E]">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#FAF9F9] flex items-center justify-center">
        <div className="text-2xl text-[#555B6E]">Listing not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F9] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#BEE3DB] rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {listing.imageUrl && (
                <Image
                  src={listing.imageUrl}
                  alt={listing.name}
                  width={400}
                  height={400}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              )}
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-[#555B6E] font-semibold">
                {listing.category}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-semibold text-[#555B6E]">
                {listing.name}
              </h1>
              <p className="mt-2 text-xl text-[#555B6E]">${listing.price}</p>
              <p className="mt-4 text-[#555B6E]">{listing.description}</p>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-[#555B6E]">Components:</h2>
                <ul className="mt-2 list-disc list-inside">
                  {listing.components.map((component, index) => (
                    <li key={index} className="text-[#555B6E]">
                      <span className="font-semibold">{component.name}</span> - {component.description} (Quantity: {component.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button 
                  onClick={handleCheckout}
                  className="bg-[#555B6E] text-white hover:bg-[#555B6E]/90"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

