const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signup = (req, res, next) => {
    let user = req.body; 

//Vérification de la bonne syntaxe des données reçues via regex + array de vérification
    let emailChecking = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let stringChecking = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,}$/;
    let checking = [
        emailChecking.test(user.email),
        stringChecking.test(user.lastname),
        stringChecking.test(user.firstname),
        stringChecking.test(user.username), 
        stringChecking.test(user.division),
    ]
    if(checking.every(Boolean)) {
        bcrypt.hash(user.password, 10)
        .then(hash => {
// Chiffrement de l'email 
            key = "¼<HM0¯¶WÝÛðãç°åò;Þº¡þbÚ¼,:=~x:Fz";
            cipher = crypto.createCipher('aes192', key)
            cipher.update(req.body.email, 'binary', 'hex')
            encodedString = cipher.final('hex')
// Enregistrement des données
            user.email = encodedString;
            user.password = hash; 
// Vérification existence email ou username
            bdd.query('SELECT * from users WHERE username="'+user.username+'" OR email="'+user.email+'"', (err, result) => { 
                if(err) throw err; 
                if(result.length >= 1) {
                    return res.status(500).json({ message: "Pseudo et/ou Email déjà utilisé."});
                }
// Enregistrement du compte dans la base si nouvel utilisateur
                else { 
                    bdd.query('INSERT INTO users SET ?', user,  (erreur, res) => {
                        if (erreur) throw erreur; 
                        return res.status(201).json({ message: 'Compte validé. Redirection en cours.'});
                    })
                }
            })
        })
    }
    else {
        return res.status(500).json({ message: 'Merci de vérifier les champs saisies'});
    }
};

exports.login = (req, res) => {
    let string = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,}$/;
    let user = req.body;
    let checking = [
        string.test(user.username),
        string.test(user.password) 
    ]
    if(checking.every(Boolean)) {
// Si présence d'un username, recherche du password
        bdd.query('SELECT password, id FROM users WHERE username="'+user.username+'"', (err, result) => { 
            if(err) throw err; 
            if(result.length <= 0) {
                return res.status(500).json({ message: "Utilisateur inconnu"});
            } else {
                console.log(user.password); 
                console.log(result[0]);
                bcrypt.compare(user.password, result[0].password)
                .then(valid => {
                    if(!valid) return res.status(500).json({ message: "Vérifier le mot de passe saisie."});
                        res.status(200).json({ 
                            message: 'Connection valide, redirection en cours.',
                            token: jwt.sign(
                                { userId: result[0].id },
                                '¼<HM0¯¶WÝÛðãç°åò;Þº¡þbÚ¼,:=~x:Fz',
                                { expiresIn: '24h'}
                            ), 
                            userId: result[0].id
                        });
                })
                .catch(() => {
                    return res.status(500).json({ message: "Erreur de connexion"});
                })
            }
        })
    }
    else {
        return res.status(500).json({ message: 'Merci de vérifer les données saises'});
    }
};

exports.getInfos = (req, res, next) => {
    bdd.query('SELECT * FROM users WHERE id="'+req.params.id+'"', (err, resultat) => {
        if(err) throw err; 
        console.log(resultat);
        return res.status(200).json(resultat);
    })
};

exports.getAllPosts = (req, res, next) => {
    let IdParsed = parseInt(req.params.id, 10)
    console.log(IdParsed);

    bdd.query('SELECT * FROM posts WHERE authorId="'+IdParsed+'" ORDER BY id DESC', (err, resultat) => {
        if(err) throw err; 
        return res.status(200).json(resultat);
    })
};

exports.getAllUsers = (req, res, next) => {
    bdd.query('SELECT * FROM users', (err, resultat) => {
        if(err) throw err;
        return res.status(200).json(resultat);
    })
};