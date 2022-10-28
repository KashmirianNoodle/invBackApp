const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { investmentService } = require("../services")

const createInvestment = catchAsync(async (req, res) => {
    const investment = await investmentService.createInvestment(req.body)
    res.status(httpStatus.CREATED).send(investment)
});

const getInvestments = catchAsync(async (req, res) => {
    // proper filters missing
    const filter = pick(req.query, ['planType']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await investmentService.queryInvestments(filter, options);
    res.send(result)
});

const getInvestment = catchAsync(async (req, res) => {
    const investment = await investmentService.getInvestmentById(req.params.investmentId)
    if (!investment) {
        throw new ApiError(httpStatus.NOT_FOUND, "investment not found")
    }
    res.send(investment)
});

const updateInvestment = catchAsync(async (req, res) => {
    const investment = await investmentService.updateInvestmentById(req.params.investmentId, req.body)
    res.send(investment)
});

const deleteInvestment = catchAsync(async (req, res) => {
    await investmentService.deleteInvestmentById(req.params.investmentId)
    res.status(httpStatus.NO_CONTENT).send()
});


module.exports = {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
};