import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/listing';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const session = await getServerSession(req, res, authOptions); 
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized', success: false });
  }

  if (req.method === 'GET') {
    try {
      const listings = await Listing.find({ userId }).lean();
      if (!listings.length) {
        return res.status(404).json({ error: 'No listings found', success: false });
      }
      return res.status(200).json({ data: listings, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch listings', success: false });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed', success: false }); 
  }
}
