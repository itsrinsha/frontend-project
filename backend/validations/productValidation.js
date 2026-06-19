import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow('', null).optional(),
    image: Joi.string().optional(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).default(0),
    id: Joi.alternatives().try(Joi.string(), Joi.number()), // To support legacy id
}).unknown(true);
