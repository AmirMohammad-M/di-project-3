import { Schema } from 'mongoose'

const schema = new Schema({
  title: { type: String, required: true },
  code: { type: String, unique: true, required: true }
})

module.exports = schema
