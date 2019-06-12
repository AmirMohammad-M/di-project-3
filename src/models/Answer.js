import { Schema } from 'mongoose'

const schema = new Schema({
  question: { type: String, required: true },
  questioner: { type: Schema.Types.ObjectId, required: true },
  topics: { type: [String] },
  upvotesCount: { type: Number, default: 0 },
  askedAt: { type: Date, default: Date.now }
})

module.exports = schema
