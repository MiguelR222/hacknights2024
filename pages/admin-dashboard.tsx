'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'

interface Appointment {
  _id: string;
  date: string;
  itemName: string;
  description: string;
}

interface Listing {
  userId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  components?: Array<{
    name: string;
    description: string;
    quantity: number;
  }>;
  status: string;
  poster?: string;
  imageGallery?: Array<string>;
}

const categories = ['tools', 'electronics', 'mobility device', 'outdoors', 'miscellaneous'];

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const {data: session} = useSession()
  const [listing, setListing] = useState<Listing>({
    userId: session?.user.id || '',
    name: '',
    price: 0,
    description: '',
    category: '',
    components: [],
    status: 'active',
    poster: '',
    imageGallery: [],
  });
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/admin-appointments');
      const data = await response.json();
      if (response.ok) {
        setAppointments(data.data);
      } else {
        console.error('Failed to fetch appointments:', data.error);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setListing(prevListing => ({
      ...prevListing,
      name: appointment.itemName,
      description: appointment.description,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setListing(prevListing => ({
      ...prevListing,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setListing(prevListing => ({
      ...prevListing,
      category: value,
    }));
  };

  const handleCreateListing = async () => {
    try {
      const response = await fetch('/api/create-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Listing created successfully:');
        fetchAppointments();
      } else {
        console.error('Failed to create listing:', data.error);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F9]">
          <Header  />
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="mt-3 text-3xl font-bold mb-6 text-[#555B6E]">Admin Dashboard</h1>
        {!selectedAppointment ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-[#555B6E]">Registros Pendientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment._id} className="bg-[#D6E9E5]">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-[#555B6E] mb-2">{appointment.itemName}</h3>
                    <p className="text-[#555B6E] mb-4">{appointment.description}</p>
                    <p className="text-[#555B6E] mb-4">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                    <Button 
                      onClick={() => handleSelectAppointment(appointment)}
                      className="bg-[#555B6E] text-white hover:bg-[#555B6E]/90"
                    >
                      Crear Listing
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-[#D6E9E5] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">Create Listing</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                <Input id="name" name="name" value={listing.name} onChange={handleInputChange} className="mt-1 text-gray-500 border border-gray-300" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-black">Price</label>
                <Input id="price" name="price" type="number" value={listing.price} onChange={handleInputChange} className="mt-1 text-gray-500 border border-gray-300" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">Description</label>
                <Textarea id="description" name="description" value={listing.description} onChange={handleInputChange} className="mt-1 text-black border border-gray-300" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-black">Category</label>
                <Select onValueChange={handleCategoryChange} value={listing.category}>
                  <SelectTrigger className='text-gray-500 border border-gray-300'>
                    <SelectValue placeholder="Select a category"  className='text-gray-300'/>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-[#555B6E]">Poster Image</label>
                <Button onClick={() => handleImageUpload('poster')} className="mt-1">
                  Upload Poster Image
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#555B6E]">Image Gallery</label>
                <Button onClick={() => handleImageUpload('gallery')} className="mt-1">
                  Upload Gallery Images
                </Button>
              </div> */}
              <div className="flex justify-end space-x-4">
                <Button onClick={() => setSelectedAppointment(null)} variant="outline" className='text-gray-500 '>
                  Cancel
                </Button>
                <Button onClick={handleCreateListing} className="bg-[#555B6E] text-white hover:bg-[#555B6E]/90">
                  Create Listing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='mt-5'><Footer/></div>
          
    </div>
  );
}

