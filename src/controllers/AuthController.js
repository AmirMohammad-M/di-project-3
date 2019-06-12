import bcrypt from 'bcrypt'
import { User } from '../models'
import jwt from '../utils/jwt'

async function signup(req, res) {
  const { username, name, password, favoriteTopics, masterAtTopics } = req.body
  const hash = bcrypt.hashSync(password, 10)
  await new User({
    name,
    username: username.toLowerCase(),
    password: hash,
    favoriteTopics: favoriteTopics.split(':'),
    masterAtTopics: masterAtTopics.split(':')
  }).save()
  res.send(`User ${username.toLowerCase()} Created!`)
}

async function login(req, res) {
  const { username, password } = req.body
  const user = await User.findOne({ username }).lean()
  if (user) {
    const match = bcrypt.compareSync(password, user.password)
    if (match) {
      /* eslint no-underscore-dangle: 0 */
      const auth = jwt.sign({ id: user._id })
      res.json({ status: 'OK', token: auth })
    } else res.json({ status: 'ERR' })
  } else res.send('Not Found!')
}

async function isAuthorized(req, res, next) {
  if (req.headers.authorization) {
    const decoded = jwt.verify(req.headers.authorization)
    if (decoded.id) {
      const user = await User.findById(decoded.id).lean()
      req.user = user
      return next()
    }
  }
  return res.json({ error: { code: 'AUTH', message: 'Not Authorized' } })
}
module.exports = {
  signup,
  login,
  isAuthorized
}
