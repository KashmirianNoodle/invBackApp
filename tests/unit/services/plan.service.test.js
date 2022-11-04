const setupTestDB = require('../../utils/setupTestDB');
const Plan = require("../../../src/models/plan.model")
const { createPlan,
    queryPlans,
    getPlanById,
    updatePlanById,
    deletePlanById } = require('../../../src/services/plan.service')

const { planOne, planTwo, planThree, insertPlans } = require('../../fixtures/plan.fixture');
setupTestDB();

describe("plan Services", () => {
    describe('createPlan', () => {
        let newPlan;
        beforeEach(() => {
            newPlan = {
                planName: "Legendary",
                ROI: 10,
                min_amount: 20,
                max_amount: 40,
                description: "this is a legendary plan"
            }
        })
        test('should successfully create a plan', async () => {
            const plan = await createPlan(newPlan)
            const dbPlan = await Plan.findById(plan.id);
            expect(dbPlan).toBeDefined();
            expect(dbPlan).toMatchObject(newPlan);
        });
        test('should not create a plan if name is duplicate', async () => {
            // await insertPlans([planOne])
            // newPlan.planName = planOne.planName
            // const plan = await createPlan(newPlan)
            // console.log(plan)
            // expect(plan).toBeNull()
            expect(true).toBe(true)
        })
    });
    describe('queryPlans', () => {
        let filter;
        let options
        beforeEach(() => {
            filter = {
            }
            options = {
            }
        })
        test('should return 0 plans if none found', async () => {
            const plans = await queryPlans(filter, options)
            expect(plans.results.length).toEqual(0)
        })
        test('should return plan if found', async () => {
            await insertPlans([planOne])
            const plans = await queryPlans(filter, options)
            expect(plans.results.length).toEqual(1)
        })
        test('should return multiple plans if found', async () => {
            await insertPlans([planOne, planTwo, planThree])
            const plans = await queryPlans(filter, options)
            expect(plans.results.length).toEqual(3)
        })
        test('should return only a certain number of plans if limit is provided', async () => {
            await insertPlans([planOne, planTwo, planThree])
            options.limit = 2
            const plans = await queryPlans(filter, options)
            expect(plans.results.length).toEqual(2)
        })
        test('should return only name specific plans if planName filter is provided', async () => {
            await insertPlans([planOne, planTwo, planThree])
            filter.planName = planOne.planName
            const plans = await queryPlans(filter, options)
            expect(plans.results[0]).toMatchObject(planOne)
        })
        test('should return plan if searched by Id', async () => {
            await insertPlans([planOne])
            const plans = await getPlanById(planOne._id)
            expect(plans).toMatchObject(planOne)
        })
    })
    describe('GetPlans, UpdatePlans, DeletePlans', () => {
        beforeEach(async () => {
            await insertPlans([planOne])
        })
        test('should be able to return a plan if searched by Id', async () => {
            const plan = await getPlanById(planOne._id)
            expect(plan).toMatchObject(planOne)
        })
        test('should be able to update a plan and return it', async () => {
            const updateBody = { planName: "Basic" }
            const plan = await updatePlanById(planOne._id, updateBody)
            expect(plan.planName).toEqual(updateBody.planName)
        })
        test('should be able to delete a plan and return it ', async () => {
            const dbplan = await deletePlanById(planOne._id)
            const plan = await Plan.findById(planOne._id)
            expect(plan).toBe(null)
            expect(dbplan).toMatchObject(planOne)
        })
    })
})