import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import connectDB from '@/lib/mongodb';
import Rental from '@/models/rental';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export const config = {
  api: {
    bodyParser: false, 
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature']!;
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send('Webhook Error: Invalid signature.');
  }

  try {
    await connectDB(); 

    if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      const metadata = charge.metadata;

      const { userId, listingId} = metadata;

      const rental = new Rental({
        renterUserId: userId,
        listingId,
        rentStart: new Date(),
        rentFinish: new Date(),
      });

      await rental.save();
      console.log('Rental created successfully:', rental);
    }

    res.status(200).send('Webhook handled successfully');
  } catch (err) {
    console.error('Error handling webhook event:', err);
    res.status(500).send('Internal Server Error');
  }
}
