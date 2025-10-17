// importo il framework express
const express = require("express");

// importiamo i dati della risorsa
const menu = require('../data/menu');

// settiamo il router
const router = express.Router();

// Rotte di CRUD sulla risorsa pizze
// index
router.get('/', function (req, res) {
    //Inizialmente, il menu filtrato corrisponde a quello originale
    let filteredMenu = menu;

    // Se la richiesta contiene un filtro, allora filtriamo il menu
    if (req.query.ingredient) {
        filteredMenu = menu.filter(
            pizza => pizza.ingredients.includes(req.query.ingredient)
        );
    }

    // restituiamo la variabile filteredMenu
    // potrebbe essere stata filtrata o contenere il menu originale
    res.json(filteredMenu);
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