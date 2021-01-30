import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as users } from './routes/auth';
import { router as budgies } from './routes/budgies';
import { router as expenses } from './routes/expenses';
require('dotenv').config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/budgies', budgies);
app.use('/api/budgies/:budgieId/expenses', expenses);

(async function () {
  try {
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
})();

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
