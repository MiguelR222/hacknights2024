'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { ChevronDown } from 'lucide-react';

interface Component {
  name: string;
  description: string;
  quantity: number;
}

interface Listing {
  name: string;
  price: number;
  description: string;
  category: string;
  components: Component[];
}

const categories = ['all', 'tools', 'electronics', 'mobility device', 'outdoor', 'miscellaneous'];

export default function Feed() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Mock data
        const fetchedListings: Listing[] = [
          {
            name: 'Hammer',
            price: 10,
            description: 'A sturdy hammer for all your construction needs.',
            category: 'tools',
            components: [
              { name: 'Handle', description: 'Wooden handle', quantity: 1 },
              { name: 'Head', description: 'Steel head', quantity: 1 }
            ]
          },
          {
            name: 'Laptop',
            price: 1000,
            description: 'A high-performance laptop for work and play.',
            category: 'electronics',
            components: [
              { name: 'Battery', description: 'Lithium-ion battery', quantity: 1 },
              { name: 'Charger', description: 'Power adapter', quantity: 1 }
            ]
          },
          {
            name: 'Bicycle',
            price: 150,
            description: 'A mountain bike for outdoor adventures.',
            category: 'mobility device',
            components: [
              { name: 'Frame', description: 'Aluminum frame', quantity: 1 },
              { name: 'Wheels', description: '26-inch wheels', quantity: 2 }
            ]
          },
          {
            name: 'Tent',
            price: 50,
            description: 'A spacious tent for camping trips.',
            category: 'outdoor',
            components: [
              { name: 'Poles', description: 'Fiberglass poles', quantity: 4 },
              { name: 'Fabric', description: 'Waterproof fabric', quantity: 1 }
            ]
          },
          {
            name: 'Misc Item',
            price: 5,
            description: 'A miscellaneous item.',
            category: 'miscellaneous',
            components: [
              { name: 'Part', description: 'Some part', quantity: 1 }
            ]
          }
        ];

        setListings(fetchedListings);
        setFilteredListings(fetchedListings);
      } catch (error) {
        console.error('Failed to fetch listings', error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredListings(listings);
    } else {
      setFilteredListings(listings.filter(listing => listing.category === selectedCategory));
    }
  }, [selectedCategory, listings]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F9]">
      <Header />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row">
          {/* Mobile dropdown filter */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#BEE3DB] text-[#555B6E] font-bold p-2 rounded flex justify-between items-center"
              >
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
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
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop sidebar filter */}
          <div className="hidden sm:block w-1/4 pr-6">
            <h2 className="text-xl font-bold mb-4 text-[#555B6E]">Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category} className="mb-2">
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === category
                        ? 'bg-[#BEE3DB] text-[#555B6E] font-bold'
                        : 'text-[#555B6E] hover:bg-[#BEE3DB] hover:bg-opacity-50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div className="w-full sm:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-[#555B6E] capitalize">
              {selectedCategory === 'all' ? 'All Items' : selectedCategory}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.name} className="bg-[#BEE3DB] p-4 sm:p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#555B6E] mb-2">{listing.name}</h3>
                  <p className="text-sm sm:text-base text-[#555B6E] mb-3">{listing.description}</p>
                  <p className="text-[#555B6E] font-bold mb-4">Price: ${listing.price}</p>
                  <div>
                    <h4 className="text-md sm:text-lg font-semibold text-[#555B6E] mb-2">Components:</h4>
                    <ul className="list-disc list-inside">
                      {listing.components.map((component, index) => (
                        <li key={index} className="text-sm sm:text-base text-[#555B6E]">
                          {component.name} ({component.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

