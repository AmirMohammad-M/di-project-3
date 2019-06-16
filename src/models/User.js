import { Schema } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  answersCount: { type: Number, default: 0 },
  upvotesCount: { type: Number, default: 0 },
  favoriteTopics: { type: [String] },
  masterAtTopics: { type: [String] },
  // authToken: { type: Schema.Types.ObjectId, index: true },
  joinedAt: { type: Date, default: Date.now }
})

module.exports = schema
