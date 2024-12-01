import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount, metadata } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "MXN",
        automatic_payment_methods: { enabled: true },
        metadata: metadata,
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Internal Error:", error);
      res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}