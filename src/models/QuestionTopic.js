import { Schema } from 'mongoose'

const schema = new Schema({
  question: { type: Schema.Types.ObjectId, required: true, index: true },
  topic: { type: Schema.Types.ObjectId, required: true, index: true }
})

module.exports = schema
