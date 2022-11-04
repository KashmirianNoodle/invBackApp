const mongoose = require('mongoose')
const faker = require('faker')
const Plan = require("../../src/models/plan.model")

const planOne = {
    _id: mongoose.Types.ObjectId(),
    planName: faker.name.findName(),
    ROI: faker.datatype.float(),
    min_amount: faker.datatype.float(),
    max_amount: faker.datatype.float(),
    description: faker.datatype.string()
};

const planTwo = {
    _id: mongoose.Types.ObjectId(),
    planName: faker.name.findName(),
    ROI: faker.datatype.float(),
    min_amount: faker.datatype.float(),
    max_amount: faker.datatype.float(),
    description: faker.datatype.string()
};

const planThree = {
    _id: mongoose.Types.ObjectId(),
    planName: faker.name.findName(),
    ROI: faker.datatype.float(),
    min_amount: faker.datatype.float(),
    max_amount: faker.datatype.float(),
    description: faker.datatype.string()
};

const insertPlans = async (plans) => {
    await Plan.insertMany(plans.map((plan) => ({ ...plan })));
};

module.exports = {
    planOne,
    planTwo,
    planThree,
    insertPlans
}
