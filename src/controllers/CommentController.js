import Promise from 'bluebird'
import { Comment, Notification, Answer } from '../models'

async function create(req, res) {
  const { content, commentOn, replyTo, replyToComment } = req.body
  const c = await Comment.create({ content, commentOn, commenter: req.user._id, replyTo, replyToComment })
  if (commentOn === 'A') {
    const a = await Answer.findById(replyTo).lean()
    await Notification.create({ type: 'COMMENT_ON_ANSWER', destUser: a.answerer, comment: c._id })
  }
  res.send('Comment Submitted!' + c._id)
}

module.exports = {
  create
}
