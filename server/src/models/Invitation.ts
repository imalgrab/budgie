import mongoose, { Model, Document } from 'mongoose';

interface IInvitation extends Document {
  budgieId: string;
  code: string;
}

export const InvitationSchema = new mongoose.Schema(
  {
    budgieId: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

export const Invitation: Model<IInvitation> = mongoose.model<IInvitation>(
  'Invitation',
  InvitationSchema,
);
