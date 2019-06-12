import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || 'salam-secret'

const sign = (payload) => jwt.sign(payload, secret)

const verify = (payload) => jwt.verify(payload, secret)

module.exports = { sign, verify }
