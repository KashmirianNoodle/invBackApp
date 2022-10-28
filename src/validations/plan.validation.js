const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlan = {
    body: Joi.object().keys({
        planName: Joi.string().required(),
        ROI: Joi.number().required(),
        max_amount: Joi.number().required(),
        min_amount: Joi.number().required(),
        description: Joi.string()
    }),
};

const getPlans = {
    query: Joi.object().keys({
        planName: Joi.string(),
        ROI: Joi.number(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getPlan = {
    params: Joi.object().keys({
        planId: Joi.string().custom(objectId),
    }),
};

const updatePlan = {
    params: Joi.object().keys({
        planId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            planName: Joi.string(),
            ROI: Joi.number(),
            max_amount: Joi.number(),
            min_amount: Joi.number(),
            description: Joi.string()
        })
        .min(1),
};

const deletePlan = {
    params: Joi.object().keys({
        planId: Joi.string().custom(objectId),
    }),
};


module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
    deletePlan
}
