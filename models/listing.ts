import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
}

const ListingSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    components: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        required: false
    }
});

export default mongoose.model<IListing>('Listing', ListingSchema);