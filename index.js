const express = require('express')

const shortid = require('shortid')

const server = express()

server.use(express.json())

const PORT = 5000

let users = []

server.get('/', (req, res) => {
    res.json({ "hello": "world"})
})

server.get('/hello', (req, res) => {
    res.json({ "hello": "Lambda School"})
})

server.post('/api/sign-up', (req, res) => {
    const user = req.body;
    user.id = shortid.generate();

    users.push(user)

    res.status(201).json(user)
})

server.get('/api/users-list', (req, res) => {

    res.json(users)
})

server.delete('/api/user-delete/:id', (req, res) => {

    const { id } = req.params

    const deleted = users.find(user => user.id === id)

    if(deleted) {
        users = users.filter(user => user.id !== id)
        res.status(201).json(deleted)
    } else {
        return res.status(404).json({ message: 'user not found '})
    }
});

server.patch('/api/user-modify/:id', (req, res) => {
    const { id } = req.params;
    const newUser = req.body

    let modified = users.find(user => user.id === id);

    if(modified){
        Object.assign(modified, newUser)
        res.status(200).json(newUser)
    } else {
        return res.status(404).json({ message: 'user not found' })
    }
})

server.listen(PORT, () => {
    console.log('server listening on localhost:', PORT)
})