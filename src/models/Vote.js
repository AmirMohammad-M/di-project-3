import { Schema } from 'mongoose'

const schema = new Schema({
  voter: { type: Schema.Types.ObjectId, required: true, index: true },
  type: { type: String, required: true, enum: ['Q', 'A', 'C'] },
  dest: { type: Schema.Types.ObjectId, required: true, index: true },
  vote: { type: Number, required: true, enum: [1, -1] }
})

module.exports = schema
