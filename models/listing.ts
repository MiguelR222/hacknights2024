import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  components?: Array<{
    name: string;
    description: string;
    quantity: number;
  }>;
    status: string;
    poster?: string;
    imageGallery?: Array<string>;
}

const ComponentSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const ListingSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['tools', 'electronics', 'mobility device', 'outdoor', 'miscellaneous'],
    default: 'miscellaneous',
    required: true,
  },
    components: [ComponentSchema],
    status: {
        type: String,
        enum: ['available', 'rented', 'pending', 'cancelled'],
        default: 'available',
        required: true,
    },
    poster: { type: String, required: false },
    imageGallery: { type: [String], required: false },
});

const Listing = mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);
export default Listing;