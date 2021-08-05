const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signup = (req, res, next) => {
    let user = req.body; 

//Vérification de la bonne syntaxe des données reçues via regex + array de vérification
    let emailChecking = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let stringChecking = /^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$/;
    let checking = [
        emailChecking.test(user.email),
        stringChecking.test(user.lastname),
        stringChecking.test(user.firstname),
        stringChecking.test(user.username), 
    ]
    // console.log(user)
//creation et initialisation algorythme et Mdp
        const algorithm = 'aes-192-cbc';
        const password = 'RANDOM_TOKEN';
//récupération de la clé de l'objet Cipher
        const key = crypto.scryptSync(password, 'salt', 24);
//création et initialisation de l'iv
        const iv = Buffer.alloc(16, 0);

    if(checking.every(Boolean)) {
        bcrypt.hash(user.password, 10)
        .then(hash => {
// Chiffrement de l'email 
            cipher = crypto.createCipheriv(algorithm, key, iv)
            cipher.update(req.body.email, 'utf-8', 'hex')
            encodedString = cipher.final('hex')
// Enregistrement des données
            user.email = encodedString;
            user.password = hash; 
            console.log('email is :'+user.email)
            console.log('paswword is :'+user.password)
// Vérification existence email ou username
            bdd.query('SELECT * from users WHERE username="'+user.username+'" OR email="'+user.email+'"', (err, result) => { 
                if(err) throw err; 
                if(result.length >= 1) {
                    return res.status(500).json({ message: "Pseudo et/ou Email déjà utilisé."});
                }
// Enregistrement du compte dans la base si nouvel utilisateur
                else { 
                    bdd.query('INSERT INTO users SET ?', user,  (err, resultat) => {
                        if (err) throw err; 
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
    let userN = /^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$/;
    let userP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
    let user = req.body;
    let checking = [
        userN.test(user.username),
        userP.test(user.password) 
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
                                'RANDOM_TOKEN',
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