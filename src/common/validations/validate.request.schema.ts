import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export function validateRequestSchema(schema: Joi.ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    };
}
