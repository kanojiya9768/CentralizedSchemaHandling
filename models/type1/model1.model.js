const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const modelSchema = mongoose.Schema({
    // Your schema here
}, {
   timestamps: true,
    strict: false,
});

modelSchema.plugin(toJSON);
modelSchema.plugin(paginate);

const Model1 = mongoose.model('Model1', modelSchema);
module.exports = {
    name: 'Model1',
    model: Model1
};