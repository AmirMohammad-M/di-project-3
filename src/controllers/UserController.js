import bcrypt from 'bcrypt'
import { User } from '../models'

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

async function getUserInfo(req, res) {
  const { username } = req.query
  const user = await User.findOne({ username }).lean()
  if (user) {
    const { password, joinedAt, __v, _id, ...userRemainder } = user
    res.json(userRemainder)
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
