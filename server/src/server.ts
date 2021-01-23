import express, { Application } from 'express';
import mongoose from 'mongoose';
import { router as budgies } from './routes/budgies';
require('dotenv').config();

const app: Application = express();
app.use(express.json());
app.use('/api/budgies', budgies);

(async function () {
  try {
    await mongoose.connect(process.env.DB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
})();

export const db = mongoose.connection;

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
