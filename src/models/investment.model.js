const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// const allPlans = {
//     basic: [],
//     medium: [],
//     Ultimate: []
// }

// const plans = Object.keys(allPlans);

const investmentSchema = mongoose.Schema({
    planType: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Plan',
        required: true,
    },
    principal: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true
    })

investmentSchema.plugin(toJSON)
investmentSchema.plugin(paginate)

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;