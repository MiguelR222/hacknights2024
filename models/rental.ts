import mongoose, { Schema, Document } from 'mongoose';

export interface IRental extends Document {
  renterUserId: string;
  listingId: string;
  rentStart: Date;
  rentFinish: Date;
}

const RentalSchema: Schema = new Schema({
  renterUserId: { type: String, required: true },
  listingId: { type: String, required: true },
  rentStart: { type: Date, required: true },
  rentFinish: { type: Date, required: true },
});

const Rental = mongoose.models.Rental || mongoose.model<IRental>('Rental', RentalSchema);

export default Rental;