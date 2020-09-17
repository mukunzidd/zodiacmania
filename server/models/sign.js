import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const signSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  category: String,
});

module.exports = mongoose.model('Sign', signSchema);
