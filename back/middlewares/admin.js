const bdd = require('../mysqlConfig');

module.exports = (req, res, next) => {
    bdd.query('SELECT privileges FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
        if(err) throw err;
        // console.log(resultat)
        if(resultat[0].privileges == "admin") {
            next();
        }
        else {
            return res.status(403).json({ message: 'Accès refusé, privilèges insuffisant.'});
        }
    })
};