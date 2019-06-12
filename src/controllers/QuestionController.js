import Promise from 'bluebird'
import { Question, User, Topic, QuestionTopic, Answer } from '../models'

async function create(req, res) {
  const { question, type, topics, requestFrom } = req.body
  const q = await Question.create({ question, type, questioner: req.user._id })
  await Promise.each(topics.split(':'), async (topic) => {
    const t = await Topic.findOne({ code: topic })
    await QuestionTopic.create({ question: q._id, topic: t._id })
  })
  await Promise.each(requestFrom.split(':'), async (username) => {
    const u = await User.find({ username })
    await Notification.create({ type: 'ANSWER_REQUEST', destUser: u._id, question: q._id })
  })
  res.send('Question created! ' + q._id)
}

async function view(req, res) {
  const { questionId } = req.query
  const q = await Question.findById(questionId).lean()
  if (q) {
    const { __v, _id, type, questioner, ...rest } = q
    const qtopics = await QuestionTopic.find({ question: _id })
    const topicsR = await Promise.map(qtopics, async (qt) => {
      const t = await Topic.findById(qt.topic)
      return t.title
    })
    let questionerR = {}
    if (type !== 'PRIVATE') {
      const qr = await User.findById(questioner)
      questionerR = { id: qr._id, name: qr.name, username: qr.username }
    }

    const anss = await Answer.find({ question: _id })
      .sort({ upvotesCount: -1 })
      .lean()
    const answers = await Promise.map(anss, async (ans) => {
      const { answerer, question, ...rest } = ans
      const u = await User.findById(answerer).lean()
      rest.answerer = { name: u.name, username: u.username }
      return rest
    })

    const cms = await Comment.find({ commentOn: 'Q', replyTo: _id })
    const comments = await Promise.map(cms, async (cm) => {
      const u = await User.findById(cm.commenter).lean()
      const commenter = { name: u.name, username: u.username }
      return {
        id: cm._id,
        commenter,
        replyTo: cm.replyToComment,
        upvotesCount: cm.upvotesCount,
        commentedAt: cm.commentedAt
      }
    })
    res.json({ question: rest, topics: topicsR, askedBy: questionerR, comments, answers })
  }
}
module.exports = {
  create,
  view
}
