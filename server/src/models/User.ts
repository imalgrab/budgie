import mongoose, { Model } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
}

interface UserDocument extends User, mongoose.Document {
  _id: string;
}

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 6, max: 42 },
    email: { type: String, required: true, min: 6, max: 255 },
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

export const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  UserSchema,
);
