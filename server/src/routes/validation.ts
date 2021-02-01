import Joi from '@hapi/joi';

export function validateSignUp(user: {
  email: string;
  username: string;
  password: string;
}) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    username: Joi.string().min(6).max(42).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
}

export function validateSignIn(user: { email: string; password: string }) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
}
