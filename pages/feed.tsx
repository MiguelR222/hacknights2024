'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Header from '@/components/Header'
import { ChevronDown } from 'lucide-react'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

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

const categoryTranslations: { [key: string]: string } = {
  'all': 'Todos',
  'tools': 'Herramientas',
  'electronics': 'Electrónica',
  'mobility device': 'Dispositivos de movilidad',
  'outdoor': 'Aire libre',
  'miscellaneous': 'Misceláneo'
}

export default function Feed() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
    setIsDropdownOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F9]">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 flex-grow">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:hidden mb-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#BEE3DB] text-[#555B6E] font-bold p-2 rounded flex justify-between items-center"
              >
                {categoryTranslations[selectedCategory]}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className="block w-full text-left px-4 py-2 text-[#555B6E] hover:bg-[#BEE3DB] hover:bg-opacity-50"
                    >
                      {categoryTranslations[category]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:block w-1/4 pr-6">
            <h2 className="text-xl font-bold mb-4 text-[#555B6E]">Categorias</h2>
            <ul>
              {categories.map((category) => (
                <li key={category} className="mb-2">
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === category
                        ? 'bg-[#BEE3DB] text-[#555B6E] font-bold'
                        : 'text-[#555B6E] hover:bg-[#BEE3DB] hover:bg-opacity-50'
                    }`}
                  >
                    {categoryTranslations[category]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full sm:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-[#555B6E] capitalize">
              {selectedCategory === 'all' ? 'Todos los productos' : categoryTranslations[selectedCategory]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing._id} 
                  className="overflow-hidden cursor-pointer sm:cursor-default"
                  onClick={() => router.push(`/product?listingId=${listing._id}`)}
                >
                  <div className="relative aspect-[3/4] group">
                    <Image
                      src={listing.poster || 'https://placehold.co/300x400'}
                      alt={listing.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-start justify-end p-4">
                      <h3 className="text-white text-lg font-semibold mb-2">{listing.name}</h3>
                      <button 
                        className="bg-[#BEE3DB] text-[#555B6E] px-4 py-2 rounded hidden sm:block"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/product?listingId=${listing._id}`);
                        }}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}