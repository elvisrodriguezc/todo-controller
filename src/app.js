const express = require('express')
require('dotenv').config()
const todosRouter = require('./router/todos.router').router

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos a mi API</h1>')
})

app.use('/todos', todosRouter)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} `)
})
