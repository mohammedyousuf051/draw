import Joi from 'joi';

export const startDrawSchema = Joi.object({
    totalTickets: Joi.number()
        .integer()
        .min(1)
        .max(10 ** 8)
        .required(),
});
