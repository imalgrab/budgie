import Joi from '@hapi/joi';

export function validateSignUp(user: {
  username: string;
  email: string;
  password: string;
}) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(42).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
}

export function validateSignIn(user: {
  // username: string;
  email: string;
  password: string;
}) {
  const schema = Joi.object({
    // username: Joi.string().min(6).max(42).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
}
