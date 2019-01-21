import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import searchRouter from './routes/search'
import favouritesRouter from './routes/favourites'
import dbInit from './db'

dbInit()
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

app.use((err, req, res, next) => {
  if (err) {
    const title = err.stack.split('\n')[0]
    res.status(500).send({ success: false, message: title })
  } else {
    next()
  }
})

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
})

//Routes
app.use('/api/wizard', searchRouter)
app.use('/api/favourites', favouritesRouter)

app.listen(3001, () => {
  console.log('Server running on PORT 3001')
})