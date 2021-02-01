import mongoose, { Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, min: 6, max: 255 },
    username: { type: String, required: true, unique: true, min: 6, max: 42 },
    password: { type: String, required: true, min: 6, max: 1024 },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
