const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { planService } = require("../services");

const createPlan = catchAsync(async (req, res) => {
    const plan = await planService.createPlan(req.body)
    res.status(httpStatus.CREATED).send(plan)
});

const getPlans = catchAsync(async (req, res) => {
    // proper filters missing
    const filter = pick(req.query, ['planName', 'ROI']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await planService.queryPlans(filter, options);
    res.send(result)
});

const getPlan = catchAsync(async (req, res) => {
    const plan = await planService.getPlanById(req.params.planId)
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, "plan not found")
    }
    res.send(plan)
});

const updatePlan = catchAsync(async (req, res) => {
    const plan = await planService.updatePlanById(req.params.planId, req.body)
    res.send(plan)
});

const deletePlan = catchAsync(async (req, res) => {
    await planService.deletePlanById(req.params.planId)
    res.status(httpStatus.NO_CONTENT).send()
});


module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
    deletePlan,
};