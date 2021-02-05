import { Request, Response } from 'express';
import { Budgie } from '../models/Budgie';

export async function getBudgies(req: Request, res: Response) {
  const { _id } = req.body.token;
  try {
    console.log({ _id });
    const budgies = await Budgie.find({ 'members.userId': _id });
    res.json(budgies);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function getBudgieById(req: Request, res: Response) {
  const { budgieId } = req.params;
  try {
    const budgie = await Budgie.findById(budgieId);
    return res.status(200).json(budgie);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addBudgie(req: Request, res: Response) {
  const {
    title,
    description,
    category,
    currency,
    members,
  }: {
    title: string;
    description?: string;
    category?: string;
    currency: string;
    members: string[];
  } = req.body;
  const { _id } = req.body.token;
  const membersWithIds = members.map((member, i) => ({
    name: member,
    userId: i === 0 ? _id : undefined,
  }));
  const budgie = new Budgie({
    title,
    description,
    category,
    currency,
    members: membersWithIds,
  });
  try {
    await Budgie.create(budgie);
    return res.status(201).json(budgie);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function removeBudgie(req: Request, res: Response) {
  const { budgieId } = req.params;
  try {
    const removedBudgie = await Budgie.deleteOne({ _id: budgieId });
    return res.status(200).json(removedBudgie);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function editBudgie(req: Request, res: Response) {
  const { budgieId } = req.params;
  try {
    const updatedBudgie = await Budgie.findOneAndUpdate(
      { _id: budgieId },
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json(updatedBudgie);
  } catch (error) {
    return res.status(500).json(error);
  }
}
