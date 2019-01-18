import express from 'express'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import searchRouter from './routes/search'

const app = express()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express Session
app.use(expressSession({
  secret: 'sessionSecret',
  cookie: { maxAge: 360000 }
}))

// Cookie Parser
app.use(cookieParser())

//Routes
app.use('/api/wizard', searchRouter)

app.listen(3001, () => {
  console.log('Server running on PORT 3001')
})
