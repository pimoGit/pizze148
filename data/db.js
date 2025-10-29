//importiamo il pacchetto mysql2
const mysql = require('mysql2');

// usiamo il metodo di creazione oggetto di connessione
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7bloodYr00T',
    database: 'pizzeria'
});

// tramite metodo connect avvia connesione
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// esportiamo il modulo CJS
module.exports = connection;