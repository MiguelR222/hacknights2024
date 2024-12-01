import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/listing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const listings = await Listing.find({});
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch listings' });
    }
  } else if (req.method === 'POST') {
    try {
     const { userId, name, price, description, category, components } = req.body;
      const newListing = await Listing.create({
        userId,
        name,
        price,
        description,
        category,
        components
      });
      await newListing.save();
      res.status(201).json(newListing);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create listing' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}