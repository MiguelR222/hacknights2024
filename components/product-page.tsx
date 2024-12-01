'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';



interface Component {
  name: string;
  description: string;
  quantity: number;
}

interface Listing {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  components: Component[];
  imageUrl: string;
}

// Mock API call
async function fetchListing(id: string): Promise<Listing | null> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockListings: Listing[] = [
    {
      id: '1',
      name: 'Hammer',
      price: 10,
      description: 'A sturdy hammer for all your construction needs. This versatile tool is perfect for both professional contractors and DIY enthusiasts.',
      category: 'tools',
      components: [
        { name: 'Handle', description: 'Ergonomic wooden handle for comfortable grip', quantity: 1 },
        { name: 'Head', description: 'Durable steel head for maximum impact', quantity: 1 }
      ],
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Laptop',
      price: 1000,
      description: 'A high-performance laptop for work and play. Featuring the latest processor and ample storage, this laptop is suitable for all your computing needs.',
      category: 'electronics',
      components: [
        { name: 'Battery', description: 'Long-lasting lithium-ion battery', quantity: 1 },
        { name: 'Charger', description: 'Fast-charging power adapter', quantity: 1 },
        { name: 'Screen', description: 'Full HD LED display', quantity: 1 }
      ],
      imageUrl: '/placeholder.svg'
    },
  ];

  return mockListings.find(listing => listing.id === id) || null;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get('listingId');
  console.log('este es el id', listingId);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F9] flex items-center justify-center">
        <div className="text-2xl text-[#555B6E]">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    console.log('no hay listing');
  }

  return (
    <div className="min-h-screen bg-[#FAF9F9] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#BEE3DB] rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
                {listing?.imageUrl && (
                                  <Image
                                  src={listing.imageUrl}
                                  alt={listing.name}
                                  width={400}
                                  height={400}
                                  className="h-48 w-full object-cover md:h-full md:w-48"
                                />)}

            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-[#555B6E] font-semibold">
                {listing?.category}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-semibold text-[#555B6E]">
                {listing?.name || 'No listing found'}
              </h1>
              <p className="mt-2 text-xl text-[#555B6E]">
                ${listing?.price}
              </p>
              <p className="mt-4 text-[#555B6E]">
                {listing?.description}
              </p>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-[#555B6E]">Components:</h2>
                <ul className="mt-2 list-disc list-inside">
                  {listing?.components.map((component, index) => (
                    <li key={index} className="text-[#555B6E]">
                      <span className="font-semibold">{component.name}</span> - {component.description} (Quantity: {component.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

