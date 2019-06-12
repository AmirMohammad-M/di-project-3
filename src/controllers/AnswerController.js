import Promise from 'bluebird'
import { User, Answer, Question } from '../models'

async function create(req, res) {
  const { question, content } = req.body
  const a = await Answer.create({ question, content, answerer: req.user._id })
  const q = await Question.findById(question).lean()
  await Notification.create({ type: 'ANSWER_ON_QUESTION', destUser: q.questioner, answer: a._id })
  res.send('Your Answer Added! ' + a._id)
}

async function view(req, res) {
  const { answerId } = req.query
  const a = await Answer.findById(answerId).lean()
  if (a) {
    const { __v, _id, answerer, ...rest } = a
    const ar = await User.findById(answerer)
    const answererR = { id: ar._id, name: qr.name, username: qr.username }

    const otherAnswersFromAnswerer = await Answer.find({ _id: { $neq: a._id } })
      .sort({ upvotesCount: -1 })
      .limit(3)
      .lean()

    const cms = await Comment.find({ commentOn: 'A', replyTo: _id })
    const comments = await Promise.map(cms, async (cm) => {
      const u = await User.findById(cm.commenter).lean()
      const commenter = { name: u.name, username: u.username }
      return {
        id: cm._id,
        content: cm.content,
        commenter,
        replyTo: cm.replyToComment,
        upvotesCount: cm.upvotesCount,
        commentedAt: cm.commentedAt
      }
    })

    res.json({ answer: rest, answeredBy: answererR, comments, otherAnswersFromAnswerer })
  }
}
module.exports = {
  create,
  view
}
