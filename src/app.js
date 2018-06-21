const express = require('express')
const app = express()
const { PORT = 5000, NODE_ENV = 'development' } = process.env

if (NODE_ENV !== 'production') require('dotenv').load()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())
app.use(require('cors')())

app.use('/api/users', require('./routes/users'))
app.use('/api/lists', require('./routes/lists'))
app.use('/api/tasks', require('./routes/tasks'))

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`

  next({ status, error })
})

app.use((err, req, res, next) => {
  console.error(err)

  const message = `Something went wrong.`
  const { status = 500, error = message } = err

  res.status(status).json({ status, error })
})

const listener = () => console.log(`Listening on port ${PORT}!`)
app.listen(PORT, listener)
