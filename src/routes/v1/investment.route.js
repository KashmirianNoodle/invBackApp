const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const investmentController = require("../../controllers/investment.controller")
const { investmentValidation } = require("../../validations")

const router = express.Router()

router
    .route("/")
    .get(auth('getInvestments'), validate(investmentValidation.getInvestments), investmentController.getInvestments)
    .post(auth('manageInvestments'), validate(investmentValidation.createInvestment), investmentController.createInvestment)

router
    .route("/:investmentId")
    .get(auth('getInvestments'), validate(investmentValidation.getInvestment), investmentController.getInvestment)
    .patch(auth('manageInvestments'), validate(investmentValidation.updateInvestment), investmentController.updateInvestment)
    .delete(auth('manageInvestments'), validate(investmentValidation.deleteInvestment), investmentController.deleteInvestment)

module.exports = router