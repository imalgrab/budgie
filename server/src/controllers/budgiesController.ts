import { Request, Response } from 'express';
import { Budgie } from '../models/Budgie';

export async function getBudgies(req: Request, res: Response) {
  try {
    setTimeout(async () => {
      const budgies = await Budgie.find();
      res.send(budgies);
    }, 2000);
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}

export async function getBudgieById(req: Request, res: Response) {
  const { budgieId } = req.params;
  try {
    const budgie = await Budgie.findById(budgieId);
    res.json(budgie);
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}

export async function addBudgie(req: Request, res: Response) {
  const { title, description, category, currency, members } = req.body;
  const budgie = new Budgie({
    title,
    description,
    category,
    currency,
    members,
  });
  try {
    await Budgie.create(budgie);
    return res.status(201).json({ inserted: true });
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}
