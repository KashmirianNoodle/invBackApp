const { Transaction } = require('../models')


const createTransaction = async (transactionBody) => {
    return Transaction.create(transactionBody);
};

const queryTransactions = async (filter, options) => {
    const transactions = await Transaction.paginate(filter, options);
    return transactions;
};

/**
 * Get transaction by id
 * @param {ObjectId} id
 * @returns {Promise<Transaction>}
 */
const getTransactionById = async (id) => {
    return Transaction.findById(id);
};


module.exports = {
    createTransaction,
    queryTransactions,
    getTransactionById
}