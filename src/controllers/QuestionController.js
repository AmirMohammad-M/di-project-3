import Promise from 'bluebird'
import { Question, User, Topic, QuestionTopic } from '../models'

async function create(req, res) {
  const { question, type, topics } = req.body
  const q = await Question.create({ question, type, questioner: req.user._id })
  await Promise.each(topics.split(':'), async (topic) => {
    const t = await Topic.findOne({ code: topic })
    await QuestionTopic.create({ question: q._id, topic: t._id })
  })
  res.send('Question created! ' + q._id)
}

async function view(req, res) {
  const { questionId } = req.query
  const q = await Question.findById(questionId)
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
    res.json({ question: rest, topics: topicsR, askedBy: questionerR })
  }
}
module.exports = {
  create,
  view
}
