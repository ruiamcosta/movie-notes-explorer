require('express-async-errors')

const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')

const PORT = 3333

const app = express()

app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})