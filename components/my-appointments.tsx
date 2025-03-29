'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Appointment {
  id: string
  date: string
  timeSlot: string
  itemName: string
  status: 'upcoming' | 'past'
}

export default function MyAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      
      const fetchAppointments = async () => {
        try {
          const response = await fetch('/api/my-appointments');  
          if (!response.ok) {
            throw new Error('Failed to fetch appointments');
          }
  
          const data = await response.json();
  
          if (data.success) {
            setAppointments(data.data); 
          } else {
            setError(data.error);  
          }
        } catch (error: any) {
          setError(error.message);
        }
      };
  
      fetchAppointments();
    }, []);

  const handleReschedule = (id: string) => {
    console.log('Reschedule appointment', id)
  }

  const handleCancel = (id: string) => {
    console.log('Cancel appointment', id)
  }

  if (appointments.length === 0) {
    return <div className="text-[#555B6E]">You have no appointments.</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#555B6E]">My Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-[#BEE3DB] transition-transform hover:scale-105">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#555B6E] mb-2">{appointment.itemName}</h3>
              <p className="text-sm sm:text-base text-[#555B6E] mb-2">Date: {appointment.date}</p>
              <p className="text-sm sm:text-base text-[#555B6E] mb-2">Time: {appointment.timeSlot}</p>
              <p className="text-sm sm:text-base text-[#555B6E] mb-3">Status: {appointment.status}</p>
              {appointment.status === 'upcoming' && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={() => handleReschedule(appointment.id)}
                    className="bg-[#555B6E] text-white hover:bg-opacity-90"
                  >
                    Reschedule
                  </Button>
                  <Button 
                    onClick={() => handleCancel(appointment.id)}
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-opacity-90"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    )
}