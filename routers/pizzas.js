// importo il framework express
const express = require("express");

// settiamo il router
const router = express.Router();

// importiamo il controller della risorsa
const pizzaController = require('../controllers/pizzaController');


// Rotte di CRUD sulla risorsa pizze
// index
router.get('/', pizzaController.index);

// show
router.get('/:id', pizzaController.show);

// store
router.post('/', pizzaController.store);

// update
router.put('/:id', pizzaController.update);

// modify
router.patch('/:id', pizzaController.modify);

// destroy
router.delete('/:id', pizzaController.destroy);

module.exports = router;