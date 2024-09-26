import Joi from 'joi';

export const enterDrawSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    hkid: Joi.string().min(1).max(20).required(),
    age: Joi.number().integer().min(1).max(120).required(),
});
