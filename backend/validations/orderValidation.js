import Joi from 'joi';

export const orderSchema = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            id: Joi.any().required(),
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().integer().min(1).required(),
            image: Joi.string().required(),
        }).unknown(true)
    ).min(1).required(),
    total: Joi.number().required(),
    shippingAddress: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string().optional(),
    date: Joi.string().optional(),
}).unknown(true);
