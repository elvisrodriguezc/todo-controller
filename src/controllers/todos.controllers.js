const path = require("path");
const fs = require("fs");

const databasePath = path.resolve("./src/database/database.json");
const databaseRead = fs.readFileSync(databasePath, "utf-8");
const database = JSON.parse(databaseRead);

const todosDB = database.data

const getAllTodos = () => {
    if (todosDB.length === 0) {
        return {
            status: 400,
            json: {
                message: "There are no todos"
            }
        }
    }
    return {
        status: 200,
        json: todosDB
    }
}

const getTodoById = (id) => {
    const data = todosDB.filter(item => item.id === id)
    if (data.length === 0) {
        return {
            status: 400,
            json: {
                message: "Try with another id, this todo is undefined"
            }
        }
    } else {
        return {
            status: 200,
            json: data[0]
        }
    }
}

const createTodo = (data) => {
    const newObj = {
        id: todosDB[todosDB.length - 1].id + 1,
        title: data.title,
        description: data.description,
        isCompleted: false
    }
    todosDB.push(newObj)
    return {
        status: 200,
        json: newObj
    }
}

const deleteTodo = (id) => {
    const index = todosDB.findIndex(item => item.id === id)
    todosDB.splice(index, 1)
    if (index === -1) {
        return {
            status: 400,
            json: {
                message: "Try with another id, this todo is undefined"
            }
        }
    }
    return {
        status: 200,
        json: {
            message: `Todo ${id} has been deleted`
        }
    }
}

const updateTodo = (id, data) => {
    const index = todosDB.findIndex(item => item.id === id)
    if (index !== -1) {
        todosDB[index] = {
            id: id,
            title: data.title,
            description: data.description,
            isCompleted: data.isCompleted
        }
        todosDB[index] = data
    } else {
        createTodo(data)
    }
    return {
        status: 200,
        json: todosDB[index]
    }
}

const updatePartialTodo = (id, data) => {
    const index = todosDB.findIndex(item => Number(item.id) === Number(id))
    if (index !== -1) {
        if (data.title !== undefined) {
            todosDB[index].title = data.title
        }
        if (data.description !== undefined) {
            todosDB[index].description = data.description
        }
        if (data.isCompleted !== undefined) {
            todosDB[index].isCompleted = data.isCompleted
        }
    } else {
        return {
            status: 400,
            json: {
                message: "Try with another id, this todo is undefined"
            }
        }
    }
    return todosDB[index]
}

exports.getAllTodos = getAllTodos
exports.getTodoById = getTodoById
exports.createTodo = createTodo
exports.updateTodo = updateTodo
exports.deleteTodo = deleteTodo
exports.updatePartialTodo = updatePartialTodo