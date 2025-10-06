const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fogado',
    port: 3307
});

app.get('/',(req, res) => {
    res.send('Működik a szerver.');
});

app.get('/ping', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).send('Database connection is OK');
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Database connection failed');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});