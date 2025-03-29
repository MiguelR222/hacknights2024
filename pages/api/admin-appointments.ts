import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Appointment, { IAppointment } from '@/models/appointment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized: No user session found', success: false });
  }

  const userId = session.user.id; 

  if (req.method === 'GET') {
    try {
      const appointments = await Appointment.find({status: "upcoming" }).lean(); 
      if (!appointments.length) {
        return res.status(404).json({ error: 'No appointments found', success: false });
      }
      return res.status(200).json({ data: appointments, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch appointments', success: false });
    }
  }

  else {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }
}
