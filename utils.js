const joi = require("joi");

const validator = (joiSchema) => (req, res, next) => {
    console.log(req.body);
    const {error} = joiSchema.validate(req.body);
    if(error) return res.status(406).send({message: error});
    else next();
}

const loginValidator = validator(joi.object({
    username: joi.string().required().max(30),
    password: joi.string().required()
}));

const signInValidator = validator(joi.object({
    username: joi.string().required().max(30),
    password: joi.string().required()
}));

const newTransactionValidator = validator(joi.object({
    date: joi.date().required(),
    currencyId: joi.string().required(),
    currencyAmount: joi.number().required(),
    cashAmount: joi.number().required(),
}));



module.exports = {loginValidator, signInValidator, newTransactionValidator};