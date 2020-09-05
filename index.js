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

    if(user.name !== undefined && user.bio !== undefined){
        users.push(user)
        res.status(201).json(user)
    } else {
        res.status(400).json({ message: 'must include name and bio'})
    }

})

server.get('/api/users-list', (req, res) => {
    if(users.length !== 0){
        res.json(users)
    } else {
        res.status(500).json({ message: 'The users information could not be retrieved.' })
    }
})

server.get('/api/users-list/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === id)
    
    if(foundUser){
        res.status(200).json(foundUser)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
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

server.put('/api/user-modify/:id', (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    newUser.id = id

    let modified = users.findIndex(user => user.id === id)

    if(modified !== -1){
        users[modified] = newUser
        res.status(200).json(newUser)
    } else {
        return res.status(404).json({ message: 'user not found' })
    }
})

server.listen(PORT, () => {
    console.log('server listening on localhost:', PORT)
})