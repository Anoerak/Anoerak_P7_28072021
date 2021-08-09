const bdd = require('../mysqlConfig');
const fs = require('fs');
const bcrypt = require('bcrypt'); 

exports.updateProfilPicture = (req, res, next) => {

    let profilPictureToUpload = `${req.protocol}://${req.get('host')}/profils/${req.file.filename}`
    let profilPictureToDelete = req.body.profilPicture.split('/profils/')[1];

    // console.log(profilPictureToDelete);

    if(profilPictureToDelete != "defaultUser.png") { 
// Pas de suppression de fichier si l'utilisateur a encore l'image de base
        fs.unlink(`imgs/profils/${profilPictureToDelete}`, () => { 
        })
    }
    
    bdd.query('UPDATE users SET profilPicture="'+ profilPictureToUpload +'" WHERE id="'+ req.body.userId +'"', (err, result) => {
        if(err) throw err;
        return res.status(201).json({ message: 'Image de profil modifiée avec succès !!'})
    })
};

exports.updatePassword = (req, res, next) => {
    let regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;

        if(regexPassword.test(req.body.currentPassword) && regexPassword.test(req.body.newPassword)) {
            bdd.query('SELECT password FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
                if(err) throw err; 
                bcrypt.compare(req.body.currentPassword, resultat[0].password)
                .then(valid => {
                    if(!valid){
                        if(!valid) return res.status(500).json({ message: "Ce mot de passe ne correspond pas à ce compte."});
                    }
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            bdd.query('UPDATE users SET password="'+hash+'" WHERE id="'+req.body.userId+'"', (err, result) => {
                                if(err) throw err;
                                return res.status(200).json({ message: 'Mot de passe modifié avec succès !!'});
                            })
                        })
                        .catch(error => console.log(error));
                })
            })
        } else {
            return res.status(500).json({ message: 'Erreur, données incorrectes.'});
        }
};

exports.deleteAccount = (req,res,next) => {
    let regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;

    if(regexPassword.test(req.body.password)) {
        bdd.query('SELECT password, profilPicture FROM users WHERE id="'+ req.body.userId +'"', (err, resultat) => {
            if(err) throw err; 
            bcrypt.compare(req.body.password, resultat[0].password)
            .then(valid => {
                if(!valid){
                    if(!valid) return res.status(500).json({ message: "Ce mot de passe ne correspond pas à l'utilisateur."});
                }
                let profilPictureToDelete = resultat[0].profilPicture.split('/profils/')[1]
                fs.unlink(`imgs/profils/${profilPictureToDelete}`, () => { 
                    bdd.query('DELETE FROM users WHERE id="'+ req.body.userId +'"',(err, result) => {
                        if(err) throw err;
                        bdd.query('DELETE FROM posts WHERE authorId="'+ req.body.userId +'"',(err, result) => { 
                            if(err) throw err;
                            bdd.query('DELETE FROM comments WHERE idAuteur="'+ req.body.userId +'"',(err, result) => { 
                                if(err) throw err;
                                return res.status(200).json({ message: 'Compte supprimé, redirection en cours.'});
                            })
                        })
                    })
                })

            })
        })
    } else {
        return res.status(500).json({ message: 'Erreur, données incorrectes.'});
    }
};