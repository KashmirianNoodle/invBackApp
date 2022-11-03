const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInvestment = {
    body: Joi.object().keys({
        planType: Joi.string().custom(objectId),
        principal: Joi.number(),
        user_id: Joi.string().custom(objectId),
    }),
};

const getInvestments = {
    query: Joi.object().keys({
        planType: Joi.string(),
        sortBy: Joi.string(),
        principle: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getInvestment = {
    params: Joi.object().keys({
        investmentId: Joi.string().custom(objectId),
    }),
};

const updateInvestment = {
    params: Joi.object().keys({
        InvestmentId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            planType: Joi.string().custom(objectId),
            principal: Joi.number(),
            user_id: Joi.string().custom(objectId),
        })
        .min(1)
};

const deleteInvestment = {
    params: Joi.object().keys({
        investmentId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
};
