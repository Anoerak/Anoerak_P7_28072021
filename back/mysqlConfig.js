var mysql = require('mysql');

// Connexion à MYSQL
var groupomaniaDb = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'á@ÅF¥Î(îÊF¤þ5_?vØwí67Ö=êe¿)aVW',
  database : 'groupomania'
});

module.exports = groupomaniaDb;