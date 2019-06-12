import bcrypt from 'bcrypt'
import { User, Question, Answer } from '../models'

async function updateUser(req, res) {
  const { username, name, password, favoriteTopics, masterAtTopics } = req.body
  const hash = bcrypt.hashSync(password, 10)
  const updated = await User.updateOne(
    { username },
    {
      name,
      username: username.toLowerCase(),
      password: hash,
      favoriteTopics: favoriteTopics.split(':'),
      masterAtTopics: masterAtTopics.split(':')
    },
    { new: true }
  ).lean()
  res.json(updated)
}
async function getMyProfile(req, res) {
  const me = await User.findById(req.user.id)
  const questions = await Question.find({ questioner: _id, type: 'PUBLIC' })
    .sort({ askedAt: -1 })
    .limit(3)
  const myLastQuestions = questions.map((q) => {
    const { __v, questioner, type, ...rest } = q
    return rest
  })
  const answers = await Answer.find({ answerer: _id })
    .sort({ answeredAt: -1 })
    .limit(3)
  const myLastAnswers = questions.map((a) => {
    const { __v, question, answerer, ...rest } = a
    return rest
  })
  res.json({ name: me.name, myLastQuestions, myLastAnswers })
}

async function getUserInfo(req, res) {
  const { username } = req.query
  const user = await User.findOne({ username }).lean()
  if (user) {
    const { password, joinedAt, __v, _id, ...userRemainder } = user
    const questions = await Question.find({ questioner: _id, type: 'PUBLIC' })
      .sort({ upvotesCount: -1 })
      .limit(3)
    const topQuestions = questions.map((q) => {
      const { __v, questioner, type, ...rest } = q
      return rest
    })
    const answers = await Answer.find({ answerer: _id })
      .sort({ upvotesCount: -1 })
      .limit(3)
    const topAnswers = questions.map((a) => {
      const { __v, question, answerer, ...rest } = a
      return rest
    })
    res.json({ user: userRemainder, topQuestions, topAnswers })
  } else res.send('Not Found!')
}

async function upsertSU() {
  const hash = bcrypt.hashSync('123456', 10)
  const a = await User.updateOne(
    { username: 'admin' },
    {
      name: 'Admin',
      username: 'admin',
      password: hash,
      favoriteTopics: ['science'],
      masterAtTopics: ['science']
    },
    { upsert: true, setDefaultsOnInsert: true }
  )
  return 'SU ' + JSON.stringify(a)
}

module.exports = {
  getUserInfo,
  upsertSU,
  updateUser
}
