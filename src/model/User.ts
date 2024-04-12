import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    fname: string;
    mname: string;
    lname: string;
    usrn: string;
    pwd: string;
    email: string;
    contact_num: string;
    created_by: number;
    created_at: number;
}

const UserSchema: Schema = new Schema({
    fname: { type: String, required: true },
    mname: { type: String, required: true },
    lname: { type: String, required: true },
    usrn: { type: String, required: true },
    pwd: { type: String, required: true },
    email: { type: String, required: true },
    contact_num: { type: String, required: true },
    created_by: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
});


export default mongoose.model<User>('User', UserSchema, 'col_users');
