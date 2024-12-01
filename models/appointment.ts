import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    userId: string;
    date: Date;
    timeSlot: string;
    itemName: string;
    category: string;
    status: string;
}

const AppointmentSchema: Schema = new Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    itemName: { type: String, required: true },
    category: {
        type: String,
        enum: ['tools', 'electronics', 'mobility device', 'outdoor', 'miscellaneous'],
        default: 'miscellaneous',
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'past', 'cancelled'],
        default: 'upcoming',
        required: true,
    },
});

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
export default Appointment;