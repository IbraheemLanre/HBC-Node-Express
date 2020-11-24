'use strict'

const express = require('express')
const app = express()

const port = 3000
const host = 'localhost'

app.get('/', (req, res) => res.send('Hello world'))

app.listen(port, host, () =>{
    console.log(`Server is running on ${host}:${port}`)
})