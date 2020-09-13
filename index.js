const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const app = express()
app.use(bodyParser.json())

const PORT = 3001

const listenFunction = () => console.log('Servidor iniciado')
app.listen(PORT, listenFunction)

const books = [
    {
        name : 'Harry Potter',
        autor: 'JK, a transfóbica',
        id : 1
    }
]

// O segundo parametro sempre tem que ser response
// Se colocar sem o request antes, da erro
const listBooks = (request, response) => {
    return response.status(200).send(books)
}

const createBook = (request, response) => {
    const book = request.body
    console.log('BOOK', book)
   
    books.push(book)

    if (book.name && book.autor && book.id) {
        return response.status(201).send({ message: 'Livro Cadastrado com sucesso'})
    } else {
        return response.status(400).send({ message: 'Falta enviar o livro correntamente'})
    }   
}

const deleteBook = (request, response) => {
    const id = request.params.id
    console.log('id', id)

    var isFoundBook = false

    if(books.length > 0) {
        books && books.find((element, index) => {
            if(element.id == id) {
                isFoundBook = true
                books.splice(index, 1)
            }
        })
    }
    

    if(isFoundBook) {
        return response.status(201).send({ message: 'Livro deletado com sucesso'})
    } else {
        return response.status(400).send({ message: 'Livro não encontrado'})
    }
    
}

const updateBook = (request, response) => {
    const id = request.params.id

    if(id) {
        return response.status(201).send({ message: 'Livro atualizado com sucesso'})
    } else {
        return response.status(400).send({ message: 'Erro ao atualizar'})
    }
}

app.get('/book', listBooks)
app.post('/book', createBook)
app.delete('/book/:id', deleteBook)
app.put('/book/:id', updateBook)