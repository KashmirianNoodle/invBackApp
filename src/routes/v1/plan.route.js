const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const planController = require('../../controllers/plan.controller')
const { planValidation } = require("../../validations")


const router = express.Router()

router
    .route("/")
    .get(auth("getPlans"), validate(planValidation.getPlans), planController.getPlans)
    .post(auth("managePlans"), validate(planValidation.createPlan), planController.createPlan)

router
    .route("/:planId")
    .get(auth("getPlans"), validate(planValidation.getPlan), planController.getPlan)
    .patch(auth("managePlans"), validate(planValidation.updatePlan), planController.updatePlan)
    .delete(auth("managePlans"), validate(planValidation.deletePlan), planController.deletePlan)

module.exports = router