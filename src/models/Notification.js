import { Schema } from 'mongoose'

const schema = new Schema({
  type: {
    type: String,
    enum: ['ANSWER_REQUEST', 'COMMENT_ON_ANSWER', 'ANSWER_ON_QUESTION'],
    required: true
  },
  destUser: { type: Schema.Types.ObjectId, required: true },
  question: { type: Schema.Types.ObjectId }, // is valid if type 0
  comment: { type: Schema.Types.ObjectId }, // is valid if type 1
  answer: { type: Schema.Types.ObjectId }, // is valid if type 2
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

module.exports = schema
