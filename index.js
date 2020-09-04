const express = require('express')
const server = express()

server.listen(5000, () => {
    console.log('server listening on localhost:', 5000)
})