'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Listing } from '@/types/objects'


export default function MyListings() {
    const [listings, setListings] = useState<Listing[]>([])
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/my-listings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch listings');
        }

          const data = await response.json();
          console.log('listing perron', data.data)
        setListings(data.data); 
      } catch (err: any) {
        console.error('Error fetching listings:', err.message);
        setError(err.message);
      }
    };

    fetchListings();
  }, []);

  if (listings.length === 0) {
    return <div className="text-[#555B6E]">You have no current listings.</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#555B6E]">My Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {listings.map((listing) => (
          <Card key={listing._id} className="bg-[#BEE3DB] transition-transform hover:scale-105">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#555B6E] mb-2">{listing.name}</h3>
              <p className="text-sm sm:text-base text-[#555B6E] mb-3">{listing.description}</p>
              <p className="text-[#555B6E] font-bold mb-2">Price: ${listing.price}</p>
              <p className="text-[#555B6E]">Category: {listing.category}</p>
              <p className="text-[#555B6E]">Category: {listing.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

