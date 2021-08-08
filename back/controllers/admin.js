const bdd = require('../mysqlConfig');

exports.getStatsUsers = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM users GROUP BY id', (err, users) => {
        if(err) {
            console.log(err);
            res.status(501).json({ message: 'Erreur de transmission total utilisateurs'});
            throw (err);
        }
        return res.status(200).json({ users });
    })
}
exports.getStatsPosts = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM posts GROUP BY id', (err, posts) => {
        if(err) {
            console.log(err);
            res.status(501).json({ message: 'Erreur de transmission total posts'});
            throw (err);
        }
        return res.status(201).json({ posts });
    })
}
exports.getStatsComments = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM comments GROUP BY id', (err, comments) => {
        if(err) {
            console.log(err);
            res.status(501).json({ message: 'Erreur de transmission total commentaires'});
            throw (err);
        }
        return res.status(200).json({ comments });
    })
}
exports.getStatsFlagged = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM posts WHERE isFlagged="1" GROUP BY id', (err, flagged) => {
        if(err) {
            console.log(err);
            res.status(501).json({ message: 'Erreur de transmission total commentaires signalés'});
            throw (err);
        }
        return res.status(200).json({ flagged });
    })
}

exports.getFlaggedPosts = (req, res, next) => {

    bdd.query('SELECT * FROM posts WHERE isFlagged="1" ORDER BY id DESC ', (err, resultat) => {
        if(err) throw (err);
        return res.status(200).json({ resultat });
    })
};

exports.flagPost = (req,res,next) => {

        bdd.query('SELECT role FROM users WHERE id="'+req.body.userId+'"', (err, result) => { // Vérification des accès de celui qui fait la requête
            if(err) {
                return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
            }
            if(result[0].role == "admin" && req.body.roleUser == "admin") {
                if(req.body.isFlagged == 0) {
                bdd.query('UPDATE posts SET isFlagged="1" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                    if(err) {
                        return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
                    }
                    return res.status(200).json({ message: 'Le poste a bien été mis en quarantaine'});
                })
                } else {
                    bdd.query('UPDATE posts SET isFlagged="0" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                        if(err) {
                            return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
                        }
                        return res.status(200).json({ message: "Le poste a été remis dans le fil d'actualité"});
                    })
                }
            }
        })
};
