const router = require('express').Router()
const todosController = require('../controllers/todos.controllers')

router.get('/', (req, res) => {
    const response = todosController.getAllTodos()
    res.status(response.status).json(response.json)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const response = todosController.getTodoById(id)
    res.status(response.status).json(response.json)
})

router.post('/', (req, res) => {
    const data = req.body
    const response = todosController.createTodo(data)
    res.status(response.status).json(response.json)
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const response = todosController.deleteTodo(id)
    res.status(response.status).json(response.json)
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const response = todosController.updateTodo(id, data)
    res.status(response.status).json(response.json)
})

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const response = todosController.updatePartialTodo(id, data)
    res.status(response.status).json(response.json)
})
exports.router = router