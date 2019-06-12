import express from 'express'
import bodyParser from 'body-parser'
import { upsertSU } from './controllers/UserController'
import { isAuthorized } from './controllers/AuthController'
import UserRoutes from './routes/UserRoutes'
import AuthRoutes from './routes/AuthRoutes'
import QuestionRoutes from './routes/QuestionRoutes'
import AnswerRoutes from './routes/AnswerRoutes'
import CommentRoutes from './routes/CommentRoutes'
import VoteRoutes from './routes/VoteRoutes'
import { QuestionTopic, Topic, Question } from './models'

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/', AuthRoutes)
app.use('/user', isAuthorized, UserRoutes)
app.use('/question', QuestionRoutes)
app.use('/vote', isAuthorized, VoteRoutes)
app.use('/comment', CommentRoutes)
app.use('/answer', AnswerRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', isAuthorized, async (req, res) => {
  const ft = req.user.favoriteTopics[0]
  const topic = await Topic.findOne({ code: ft })
  const questions = await QuestionTopic({ topic: topic._id }).lean()
  const interestings = await Promise.map(questions, async (q) => {
    const qu = await Question.findById(q).lean()
    return { question: qu.question, upvotesCount: qu.upvotesCount, id: qu._id }
  })
  interestings = interestings.sort((a, b) => {
    if (a.upvotesCount > b.upvotesCount) return -1
    return 1
  })
  res.json({ interestings })
})

upsertSU().then(console.log)

app.listen(2000)
