// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

// impostiamo la rotta di index
app.get("/", (req, res) => {
    console.log("hai richiesto la rotta di index");

    res.send('<h1>Ecco la home della API della nostra pizzeria</h1>')
})

// test rotta dettaglio (uso parametro dinamico)
app.get('/pizzas/:id', function (req, res) {

    console.log("il parametro ha valore: ", req.params.id);
    res.send(`il parametro ha valore: ${req.params.id}`);
})

// impostiamo la rotta di menu
app.get("/menu", (req, res) => {
    // creiamo l'array di oggetti da ritornare sulla rotta
    const menu = [
        {
            name: "Margherita",
            image: "imgs/pizze/margherita.webp",
            ingredients: ["pomodoro", "mozzarella"],
        }, {
            name: "Marinara",
            image: "imgs/pizze/marinara.jpeg",
            ingredients: ["pomodoro", "aglio", "origano"],
        }, {
            name: "Diavola",
            image: "imgs/pizze/diavola.jpeg",
            ingredients: ["pomodoro", "mozzarella", "salame piccante"],
        }, {
            name: "Bufalina",
            image: "imgs/pizze/bufalina.jpeg",
            ingredients: ["pomodoro", "mozzarella di bufala"],
        }, {
            name: "4 formaggi",
            image: "imgs/pizze/4_formaggi.jpeg",
            ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
        }
    ];


    // inviamo la risposta con il json relativo
    res.json(menu)
})


// mettiamo in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});