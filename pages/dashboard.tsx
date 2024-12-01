'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDown } from 'lucide-react'
import MyListings from '@/components/my-listings'
import MyAppointments from '@/components/my-appointments'
import CreateAppointment from '@/components/create-appointments'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const tabs = ['My Listings', 'My Appointments', 'Create Appointment']

export default function Dashboard() {
  const { data: session } = useSession()
  const [selectedTab, setSelectedTab] = useState('My Listings')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!session) {
    return <div className="container mx-auto p-4 text-[#555B6E]">Please sign in to access the dashboard.</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F9]">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-[#555B6E]">Welcome, {session.user?.name}</h1>
        <div className="flex flex-col sm:flex-row">
          {/* Mobile dropdown */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#BEE3DB] text-[#555B6E] font-bold p-2 rounded flex justify-between items-center"
              >
                {selectedTab}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setSelectedTab(tab)
                        setIsDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-[#555B6E] hover:bg-[#BEE3DB] hover:bg-opacity-50"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden sm:block w-1/4 pr-6">
            <h2 className="text-xl font-bold mb-4 text-[#555B6E]">Dashboard</h2>
            <ul>
              {tabs.map((tab) => (
                <li key={tab} className="mb-2">
                  <button
                    onClick={() => setSelectedTab(tab)}
                    className={`w-full text-left p-2 rounded ${
                      selectedTab === tab
                        ? 'bg-[#BEE3DB] text-[#555B6E] font-bold'
                        : 'text-[#555B6E] hover:bg-[#BEE3DB] hover:bg-opacity-50'
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div className="w-full sm:w-3/4">
            {selectedTab === 'My Listings' && <MyListings />}
            {selectedTab === 'My Appointments' && <MyAppointments />}
            {selectedTab === 'Create Appointment' && <CreateAppointment />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
