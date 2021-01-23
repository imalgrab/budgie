import { Request, Response, NextFunction } from 'express';
import { Budgie } from '../models/Budgie';
import { db } from '../server';

const collectionName = 'budgies';

export async function getBudgies(req: Request, res: Response) {
  try {
    const budgies = await db.collection(collectionName).find({}).toArray();
    return res.send(budgies);
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}

export async function addBudige(req: Request, res: Response) {
  const { title, description, category, currency, members } = req.body;
  const budgie = new Budgie({
    title,
    description,
    category,
    currency,
    members,
    expenses: [],
  });
  try {
    // await db.collection(collectionName).insertOne({
    //   title,
    //   description,
    //   category,
    //   currency,
    //   members,
    // });
    await budgie.save();
    return res.status(201).json({ inserted: true });
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}
