const httpStatus = require('http-status');
const { Plan } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an plan
 * @param {Object} planBody
 * @returns {Promise<Plan>}
 */
const createPlan = async (planBody) => {
    return Plan.create(planBody);
};

/**
 * Query for plan
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlans = async (filter, options) => {
    const plans = await Plan.paginate(filter, options);
    return plans;
};

/**
 * Get plan by id
 * @param {ObjectId} id
 * @returns {Promise<Plan>}
 */
const getPlanById = async (id) => {
    return Plan.findById(id);
};

// /**
//  * Get investment by user_id.
//  * @param {string} user_id
//  * @returns {Promise<User>}
//  */
// const getUserByEmail = async (email) => {
//   return User.findOne({ email });
// };

/**
 * Update plan by id
 * @param {ObjectId} planId
 * @param {Object} updateBody
 * @returns {Promise<Plan>}
 */
const updatePlanById = async (planId, updateBody) => {
    const plan = await getPlanById(planId);
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    Object.assign(plan, updateBody);
    await plan.save();
    return plan;
};

/**
 * Delete investment by id
 * @param {ObjectId} PlanId
 * @returns {Promise<Plan>}
 */
const deletePlanById = async (planId) => {
    const plan = await getPlanById(planId);
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    await plan.remove();
    return plan;
};

module.exports = {
    createPlan,
    queryPlans,
    getPlanById,
    updatePlanById,
    deletePlanById
};
