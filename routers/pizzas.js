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
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il pizza tramite id
    const pizza = menu.find(pizza => pizza.id === id);

    // Facciamo il controllo
    if (!pizza) {

        //Imposto lo status 404
        res.status(404)

        // Restituisco un JSON con le altre informazioni
        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    // Restituiamolo sotto forma di JSON   
    res.json(pizza);
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