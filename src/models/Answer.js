import { Schema } from 'mongoose'

const schema = new Schema({
  content: { type: String, required: true },
  answerer: { type: Schema.Types.ObjectId, required: true, index: true },
  question: { type: Schema.Types.ObjectId, required: true, index: true },
  upvotesCount: { type: Number, default: 0 },
  answeredAt: { type: Date, default: Date.now, index: true }
})

module.exports = schema
