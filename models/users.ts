import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);