import Promise from 'bluebird'
import { Vote, Comment, Answer, Question } from '../models'

async function up(req, res) {
  const { type, dest } = req.body
  const r = await Vote.updateOne(
    { voter: req.user._id, type, dest },
    { voter: req.user._id, type, dest, vote: 1 },
    { upsert: true }
  )
  let diff = 0
  if (r.nModified) {
    diff = 2
  } else if (r.n) {
    diff = 1
  } else diff = 0

  if (type === 'Q') {
    await Question.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  } else if (type === 'A') {
    await Answer.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  } else {
    await Comment.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  }
}

async function down(req, res) {
  const { type, dest } = req.body
  const r = await Vote.updateOne(
    { voter: req.user._id, type, dest },
    { voter: req.user._id, type, dest, vote: -1 },
    { upsert: true }
  )
  let diff = 0
  if (r.nModified) {
    diff = -2
  } else if (r.n) {
    diff = -1
  } else diff = 0

  if (type === 'Q') {
    await Question.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  } else if (type === 'A') {
    await Answer.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  } else {
    await Comment.updateOne({ _id: dest }, { $inc: { upvotesCount: diff } })
  }
}
module.exports = {
  up,
  down
}
