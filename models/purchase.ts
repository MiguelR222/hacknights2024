import { Schema, model } from 'mongoose';

export interface Purchase {
    renterUserId: string;
    clientUserId: string;
    productPrice: number;
    rentStart: Date;
    rentFinish: Date;
}
const purchaseSchema = new Schema<Purchase>({
    renterUserId: { type: String, required: true },
    clientUserId: { type: String, required: true },
    productPrice: { type: Number, required: true },
    rentStart: { type: Date, required: true },
    rentFinish: { type: Date, required: true },
});

export const PurchaseModel = model<Purchase>('Purchase', purchaseSchema);