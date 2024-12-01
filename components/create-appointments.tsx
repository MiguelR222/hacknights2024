'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const categories = ['tools', 'electronics', 'mobility devices', 'outdoors', 'miscellaneous']

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  timeSlot: z.string().min(1, { message: "Time slot is required" }),
  itemName: z.string().min(1, { message: "Item name is required" }),
  category: z.enum(categories as [string, ...string[]]),
  description: z.string().min(1, { message: "Description is required" }),
})

export default function CreateAppointment() {
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      timeSlot: "",
      itemName: "",
      category: "tools",
      description: "",
    },
  })

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null); // Reset error before submitting

    try {
      // Send data to API
      const response = await fetch('/api/my-appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json();

      if (response.ok) {
        // Handle successful appointment creation, e.g., display a success message or redirect
        alert('Appointment created successfully');
      } else {
        // Handle API errors
        setError(result.error || 'Failed to create appointment');
      }
    } catch (error) {
      setError('An error occurred while creating the appointment');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#555B6E]">Create Appointment</h2>
      <Card className="bg-[#D6E9E5] shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium text-[#555B6E] mb-1">Date</label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <Input type="date" {...field} className="w-full border border-gray-300" />}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555B6E] mb-1">Time Slot</label>
              <Controller
                name="timeSlot"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className='border border-gray-300'>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555B6E] mb-1">Item Name</label>
              <Controller
                name="itemName"
                control={control}
                render={({ field }) => <Input {...field} className="w-full border border-gray-300" />}
              />
              {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555B6E] mb-1">Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className='border border-gray-300'>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#555B6E] mb-1">Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea {...field} className="w-full border border-gray-300" />}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button 
              type="submit" 
              className="w-full bg-[#555B6E] text-white hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Appointment...' : 'Create Appointment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
