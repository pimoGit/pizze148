// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// importiamo modulo router pizze
const pizzaRouter = require("./routers/pizzas")

// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));


// impostiamo la rotta di home
app.get("/", (req, res) => {
    console.log("hai richiesto la rotta di index");

    res.send('<h1>Ecco la home della API della nostra pizzeria</h1>')
})

// rotte per le pizze
app.use("/pizzas", pizzaRouter);




// mettiamo in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});