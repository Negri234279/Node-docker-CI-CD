require('dotenv').config() 
const express = require('express')
const { Pool } = require('pg')

const PORT = process.env.APP_PORT

const app = express()

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM users')
        res.json(data.rows)
    } catch (error) {
        res.status(404).send('Error')
    }
})

app.listen(PORT, () => console.log(`Server running on: http:127.0.0.1:${PORT}`))