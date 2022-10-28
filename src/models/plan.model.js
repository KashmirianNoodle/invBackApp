const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const planSchema = mongoose.Schema({
    planName: {
        type: String,
        required: true,
        unique: true
    },
    ROI: {
        type: Number,
        required: true
    },
    min_amount: {
        type: Number,
        required: true
    },
    max_amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    })


planSchema.plugin(toJSON)
planSchema.plugin(paginate)

const Plan = mongoose.model("Plan", planSchema)


module.exports = Plan
