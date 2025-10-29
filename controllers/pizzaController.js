// importiamo i dati della risorsa
const menu = require('../data/menu');


// Importiamo il file di connessione al database
const connection = require('../data/db');

//  INDEX
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM pizzas';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// SHOW
function show(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = req.params.id

    // prima query di rireca della pizza singola
    const pizzaSql = 'SELECT * FROM pizzas WHERE id = ?';

    // Prepariamo la query per gli ingredienti aiutandoci con una join e Where
    const ingredientsSql = `
    SELECT I.*
    FROM ingredients I
    JOIN ingredient_pizza AS IP ON I.id = IP.ingredient_id
    WHERE IP.pizza_id = ? `;

    // Eseguiamo la prima query per la pizza
    connection.query(pizzaSql, [id], (err, pizzaResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (pizzaResults.length === 0) return res.status(404).json({ error: 'Pizza not found' });

        // Recuperiamo la pizza
        const pizza = pizzaResults[0];

        // Se è andata bene, eseguiamo la seconda query per gli ingredienti
        connection.query(ingredientsSql, [id], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggoiungiamo gli ingredienti alla pizza
            pizza.ingredients = ingredientsResults;
            res.json(pizza);
        });
    });


}

// STORE
function store(req, res) {

    //recuperiamo i dati dal corpo della richiesta
    const { name, image } = req.body;

    // inizializziamo la query
    const sql = 'INSERT INTO pizzas (name, image) VALUES (?, ?)'

    // eseguiamo la query
    connection.query(
        sql,
        [name, image],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to insert pizza' });
            res.status(201); // status corretto
            console.log(results)
            res.json({ id: results.insertId }); // restituiamo l'id assegnato dal DB
        }
    );
}

// UPDATE
function update(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = req.params.id;

    // recuperiamo i dati dal body della richiesta
    const { name, image } = req.body;

    // Prepariamo la query per aggiornare la pizza
    connection.query(
        'UPDATE pizzas SET name = ?, image = ? WHERE id = ?',
        [name, image, id],
        (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update pizza' });
            res.json({ message: 'Pizza updated successfully' });
        }
    );
}

// MODIFY
function modify(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il pizza tramite id
    const pizza = menu.find(pizza => pizza.id === id);

    // Piccolo controllo
    if (!pizza) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    // Aggiorniamo la pizza
    req.body.name ? pizza.name = req.body.name : pizza.name = pizza.name;
    req.body.image ? pizza.image = req.body.image : pizza.image = pizza.image;
    req.body.ingredients ? pizza.ingredients = req.body.ingredients : pizza.ingredients = pizza.ingredients;

    // Controlliamo il menu
    console.log(menu)

    // Restituiamo la pizza appena aggiornata
    res.json(pizza);
}

// DESTROY
function destroy(req, res) {
    // recuperiamo l'id dall' URL 
    const { id } = req.params;
    const sql = 'DELETE FROM pizzas WHERE id = ?'

    //Eliminiamo la pizza dal menu                       
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
        res.sendStatus(204)
    });
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }