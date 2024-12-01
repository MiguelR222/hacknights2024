'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Component {
  name: string
  description: string
  quantity: number
}

interface Listing {
  _id: string
  name: string
  price: number
  description: string
  category: string
  components: Component[]
  poster: string
}

const categories = ['all', 'tools', 'electronics', 'mobility device', 'outdoor', 'miscellaneous']

export default function Feed() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings')
        const data = await response.json()

        if (response.ok) {
          setListings(data.data)
          setFilteredListings(data.data)
        } else {
          console.error('Failed to fetch listings:', data.error)
        }
      } catch (error) {
        console.error('Failed to fetch listings', error)
      }
    }

    fetchListings()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredListings(listings)
    } else {
      setFilteredListings(listings.filter(listing => listing.category === selectedCategory))
    }
  }, [selectedCategory, listings])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <aside className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Categories</h2>
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </aside>

          <section className="w-full lg:w-3/4">
            <h2 className="text-3xl font-bold mb-6 text-foreground capitalize">
              {selectedCategory === 'all' ? 'All Items' : selectedCategory}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing._id} 
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={listing.poster || '/placeholder.svg'}
                      alt={listing.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{listing.description.slice(0, 100)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">${listing.price.toFixed(2)}</span>
                      <Button onClick={() => router.push(`/product?listingId=${listing._id}`)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

