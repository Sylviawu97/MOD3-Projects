const mongoose = require('mongoose');

const veggieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },

});

const Veggie = mongoose.model('Veggie', veggieSchema);

module.exports = Veggie;