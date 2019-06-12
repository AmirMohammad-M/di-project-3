import express from 'express'
import bodyParser from 'body-parser'
import { upsertSU } from './controllers/UserController'
import { isAuthorized } from './controllers/AuthController'
import UserRoutes from './routes/UserRoutes'
import AuthRoutes from './routes/AuthRoutes'
import QuestionRoutes from './routes/QuestionRoutes'

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

upsertSU().then(console.log)

app.listen(2000)
