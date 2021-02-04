import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { validateSignUp, validateSignIn } from '../routes/validation';

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const { error } = validateSignUp({ username, email, password });
  if (error) {
    return res.status(400).json(error);
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, email, password: hashedPassword });

  try {
    const newUser = await User.create(user);
    return res.status(201).json({ user: newUser._id });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function signInUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const { error } = validateSignIn({ email, password });
  if (error) {
    return res.status(400).json(error);
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'User with given email does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || '');
    res.header('auth-token', token);
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    return res.status(500).json(error);
  }
}
