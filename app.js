// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// app.use(express.static('public'));

// impostiamo la rotta di index
app.get("/", (req, res) => {
    // codice funzione
})

// mettiamo in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});