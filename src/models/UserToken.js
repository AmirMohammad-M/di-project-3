import { Schema } from 'mongoose'

const schema = new Schema({
  token: { type: String, required: true, expires: '10m' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = schema
