const httpStatus = require('http-status');
const { Investment } = require('../models')
const ApiError = require('../utils/ApiError');

/**
 * Create an investment
 * @param {Object} investmentBody
 * @returns {Promise<User>}
 */
const createInvestment = async (investmentBody) => {
    return Investment.create(investmentBody);
};

/**
 * Query for investment
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInvestments = async (filter, options) => {
    const investments = await Investment.paginate(filter, options);
    return investments;
};

/**
 * Get investment by id
 * @param {ObjectId} id
 * @returns {Promise<Investment>}
 */
const getInvestmentById = async (id) => {
    return Investment.findById(id);
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
 * Update investment by id
 * @param {ObjectId} investmentId
 * @param {Object} updateBody
 * @returns {Promise<Investment>}
 */
const updateInvestmentById = async (investmentId, updateBody) => {
    const investment = await getInvestmentById(investmentId);
    if (!investment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Investment not found');
    }
    Object.assign(investment, updateBody);
    await investment.save();
    return investment;
};

/**
 * Delete investment by id
 * @param {ObjectId} investmentId
 * @returns {Promise<Investment>}
 */
const deleteInvestmentById = async (investmentId) => {
    const investment = await getInvestmentById(investmentId);
    if (!investment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'investment not found');
    }
    await investment.remove();
    return investment;
};

module.exports = {
    createInvestment,
    queryInvestments,
    getInvestmentById,
    updateInvestmentById,
    deleteInvestmentById
};
