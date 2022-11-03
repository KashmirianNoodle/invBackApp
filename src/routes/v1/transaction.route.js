const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionController = require('../../controllers/transaction.controller')

const router = express.Router();

router
  .route('/')
  .get(auth('getTransactions'), transactionController.getTransactions)
  .post(auth('getTransactions'), transactionController.createTransaction)

router
  .route('/:transactionId')
  .get(auth('getTransactions'), transactionController.getTransaction);

module.exports = router;