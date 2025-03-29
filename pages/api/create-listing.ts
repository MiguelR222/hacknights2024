import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Listing, { IListing } from '@/models/listing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const {
        userId,
        name,
        price,
        description,
        category,
      } = req.body;

        if (!userId || !name || !price || !description) {
        return res
          .status(400)
          .json({ error: 'Missing required fields', success: false });
      }

      const validCategories = [
        'tools',
        'electronics',
        'mobility device',
        'outdoor',
        'miscellaneous',
      ];
        if (!validCategories.includes(category)) {
        return res
          .status(400)
          .json({ error: 'Invalid category', success: false });
      }

      const validStatuses = ['available', 'rented', 'pending', 'cancelled'];

      const newListing = await Listing.create({
        userId,
        name,
        price,
        description,
        category,
        status:'available',
      });

      await newListing.save();
      return res.status(201).json({ data: newListing, success: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Failed to create listing', success: false });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }
}
