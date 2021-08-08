const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const groupomaniaDb = require('./mysqlConfig'); 
var cors = require('cors')

app.use(cors())

const userRoutes = require('./routes/user');
const postsListRoutes = require('./routes/PostsList');
const userAccountRoutes = require('./routes/profil');
const adminRoutes = require('./routes/admin');

var helmet = require('helmet');
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static('./images/'));

app.use(bodyParser.json())

//Connexion à la Base de donnée Groupomaniadb
groupomaniaDb.connect(function(err){
if(!err) {
    console.log("Vous êtes maintenany connectée à Groupomania Db");
} else {
    console.log("Erreur de connection, Base de Données injoignable.");
}
})

app.use('/user/', userRoutes);
app.use('/postsList/', postsListRoutes);
app.use('/profil/', userAccountRoutes);
app.use('/admin/', adminRoutes);

module.exports = app;
