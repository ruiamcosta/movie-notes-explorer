const express = require('express')

const PORT = 3333

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})