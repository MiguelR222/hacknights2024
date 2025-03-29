import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/listing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { listingId } = req.query; 

      if (listingId) {

        const listing = await Listing.findById(listingId);

        if (!listing) {
          return res.status(404).json({ error: 'Listing not found', success: false });
        }

        return res.status(200).json({ data: listing, success: true });
      } else {

        const listings = await Listing.find({});

        if (!listings.length) {
          return res.status(404).json({ error: 'No listings found', success: false });
        }

        return res.status(200).json({ data: listings, success: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch listings', success: false });
    }
  }

  else if (req.method === 'POST') {
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
      return res.status(201).json({ data: newListing, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create listing', success: false });
    }
  }

  else {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }
}
