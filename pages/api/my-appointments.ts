import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Appointment, { IAppointment } from '@/models/appointment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // Fetch session using getServerSession
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized: No user session found', success: false });
  }

  const userId = session.user.id;  // Use the userId from the session

  // Handle GET request to fetch appointments for the logged-in user
  if (req.method === 'GET') {
    try {
      const appointments = await Appointment.find({ userId }).lean();  // Fetch appointments by userId
      if (!appointments.length) {
        return res.status(404).json({ error: 'No appointments found', success: false });
      }
      return res.status(200).json({ data: appointments, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch appointments', success: false });
    }
  }

  // Handle POST request to create a new appointment for the logged-in user
  else if (req.method === 'POST') {
    try {
      const { date, timeSlot, itemName, category, status } = req.body;

      if (!date || !timeSlot || !itemName || !category) {
        return res.status(400).json({ error: 'Missing required fields', success: false });
      }

      const newAppointment: IAppointment = new Appointment({
        userId,
        date,
        timeSlot,
        itemName,
        category,
        status: status || 'upcoming', // Default to 'upcoming' if status is not provided
      });

      await newAppointment.save();  // Save the new appointment to the database
      return res.status(201).json({ data: newAppointment, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create appointment', success: false });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }
}
