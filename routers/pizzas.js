// importo il framework express
const express = require("express");

// settiamo il router
const router = express.Router();

// Rotte di CRUD sulla risorsa pizze
// index
router.get('/', function (req, res) {
    res.send('Lista delle pizze');
});
// show
router.get('/:id', function (req, res) {
    res.send('Dettagli della pizza ' + req.params.id);
});
// store
router.post('/', function (req, res) {
    res.send('Creazione nuova pizza');
});

// update
router.put('/:id', function (req, res) {
    res.send('Modifica integrale della pizza ' + req.params.id);
});

// modify
router.patch('/:id', function (req, res) {
    res.send('Modifica parziale della pizza ' + req.params.id);
});

// destroy
router.delete('/:id', function (req, res) {
    res.send('Eliminazione della pizza ' + req.params.id);
});

module.exports = router;