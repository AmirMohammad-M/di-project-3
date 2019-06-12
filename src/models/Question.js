import { Schema } from 'mongoose'

const schema = new Schema({
  question: { type: String, required: true },
  questioner: { type: Schema.Types.ObjectId, required: true, index: true },
  type: {
    type: String,
    enum: ['PRIVATE', 'SEMI_PUBLIC', 'PUBLIC'],
    required: true,
    default: 'PUBLIC'
  },
  upvotesCount: { type: Number, default: 0 },
  askedAt: { type: Date, default: Date.now }
})

module.exports = schema
