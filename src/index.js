const express = require('express')
require('dotenv').config()

const PORT = process.env.APP_PORT

const app = express()

app.get('/', (req, res) => {
    res.json({
        status: true,
        data: [
            {
                name: 'Pedro',
                age: 25
            },
            {
                name: 'Juan',
                age: 12
            }
        ]
    })
})

app.listen(PORT, () => console.log(`Server running on: http:127.0.0.1:${PORT}`))