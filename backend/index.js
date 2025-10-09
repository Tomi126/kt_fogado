const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
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


app.get("/fogado", (req, res) => {  
    const sql = "SELECT szobak.sznev AS 'Szobanév',szobak.agy AS 'Ágyak száma' FROM `szobak`;"; 
    db.query(sql, (err, result) => {
    if (err) return res.json(err); 
    return res.json(result) 
    })
});

app.get("/kihasznaltsag", (req, res) => {  
    const sql = "SELECT szobak.sznev AS szobanev, COUNT(vendeg) AS vendegek, SUM(DATEDIFF(tav, erk)) AS vendegejszakak FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon GROUP BY szoba ORDER BY vendegek ASC;"; 
    db.query(sql, (err, result) => { 
    if (err) return res.json(err); 
    return res.json(result) 
    })
});

app.get("/foglaltsag", (req, res) => { 
    const sql = "SELECT sz.sznev AS 'Szobanév', f.erk AS 'Érkezés', f.tav AS 'Távozás' FROM szobak sz LEFT JOIN (SELECT szoba, erk, tav FROM foglalasok WHERE (szoba, erk) IN (SELECT szoba, MAX(erk) FROM foglalasok GROUP BY szoba)) f ON sz.szazon = f.szoba ORDER BY sz.sznev;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err); 
    return res.json(result) 
    })
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
