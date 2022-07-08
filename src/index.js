import express from 'express'
import postgres from 'pg'
import morgan from  'morgan'
import { PORT, DB } from './common.js'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
//app.disable('x-powered-by') - The header is removed in the nginx proxy

const pool = new postgres.Pool(DB)

app.get('/api/user', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM users')
        res.json(data.rows)
    } catch (error) {
        res.status(404).send('Error')
    }
})

app.post('/api/user', async (req, res) => {
    const { name, email, password } = req.body

    try {
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        )
        res.status(201).send()
    } catch (error) {
        res.status(400).send('Error')
    }
})

app.listen(PORT, () => console.log(`Server running on: http:127.0.0.1:${PORT}`))