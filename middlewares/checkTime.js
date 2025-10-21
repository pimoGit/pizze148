function checkTime(req, res, next) {
    // se l'ora è dopo le 22:00 e prima delle 7:00 
    // rispondiamo con un messaggio di errore
    const currDate = new Date().toLocaleString();

    console.log("Ciao sei passato dal middleware di checktime il:", currDate);


    next();
}

module.exports = checkTime