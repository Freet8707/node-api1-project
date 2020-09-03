const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world' })
})

server.listen(3000, () => console.log('server listening on port 3000'))