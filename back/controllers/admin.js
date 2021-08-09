const bdd = require('../mysqlConfig');

exports.getStatsUsers = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM users GROUP BY id', (err, users) => {
        if(err) {
            // console.log(err);
            res.status(501).json({ message: 'Erreur de transmission "Nb utilisateurs".'});
            throw (err);
        }
        return res.status(200).json({ users });
    })
}
exports.getStatsPosts = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM posts GROUP BY id', (err, posts) => {
        if(err) {
            // console.log(err);
            res.status(501).json({ message: 'Erreur de transmission "Nb" posts".'});
            throw (err);
        }
        return res.status(201).json({ posts });
    })
}
exports.getStatsComments = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM comments GROUP BY id', (err, comments) => {
        if(err) {
            console.log(err);
            res.status(501).json({ message: 'Erreur de transmission "Nb commentaires".'});
            throw (err);
        }
        return res.status(200).json({ comments });
    })
}
exports.getStatsFlagged = (req, res, err) => {
    bdd.query('SELECT id, SUM(id) FROM posts WHERE isFlagged="1" GROUP BY id', (err, flagged) => {
        if(err) {
            // console.log(err);
            res.status(501).json({ message: 'Erreur de transmission "Nb commentaires signalés".'});
            throw (err);
        }
        return res.status(200).json({ flagged });
    })
}

exports.deleteAccount = (req,res,next) => {
    bdd.query('DELETE FROM users WHERE id="'+ req.body.accountId +'"',(err, result) => { 
        if(err) throw (err);
// Sequence de code pour supprimer également les posts et commentaires mais besion de trouver un algo pour recalculer le nb de commentaires total des post
        bdd.query('DELETE FROM posts WHERE authorId="'+ req.body.accountId +'"',(err, result) => { 
            if(err) throw (err);
            bdd.query('DELETE FROM comments WHERE authorId="'+ req.body.accountId +'"',(err, result) => { 
                if(err) throw (err);
                    return res.status(200).json({ message: "Ce compte ainsi que tous les posts et/ou commentaire(s) liés à ce dernier viennent d'être supprimés."});
            })
        })  
            // return res.status(200).json({ message: "La suppression de compte est confirmé."});  
    })
};
exports.deletePost = (req,res,next) => {
    bdd.query('DELETE FROM posts WHERE id="'+ req.body.postId +'"',(err, result) => { 
        if(err) throw (err);
        bdd.query('DELETE FROM comments WHERE postId="'+ req.body.postId +'"',(err, result) => { 
            if(err) throw (err);
                return res.status(200).json({ message: "Le post ainsi que le(s) commentaire(s) inhérent à ce dernier vient d'être supprimé."});
        })
    })
};
exports.deleteComment = (req,res,next) => {
    bdd.query('DELETE FROM comments WHERE id="'+ req.body.commentId +'"',(err, result) => { 
        if(err) throw (err);
        bdd.query('UPDATE posts SET nbComments = nbComments -1 WHERE id="'+req.body.postId+'"',(err, result) => { 
            if(err) throw (err);
                return res.status(200).json({ message: "Le commentaire vient d'être supprimé."});
        })
    })
};


exports.getFlaggedPosts = (req, res, next) => {

    bdd.query('SELECT * FROM posts WHERE isFlagged="1" ORDER BY id DESC ', (err, resultat) => {
        if(err) throw (err);
        return res.status(200).json({ resultat });
    })
};
exports.unflagPost = (req,res,next) => {
    bdd.query('SELECT privileges FROM users WHERE id="'+req.body.userId+'"', (err, result) => {
        if(err) {
            return res.status(500).json({message: 'Erreur lors du traitement de la requête.'});
        }
        if(result[0].privileges == "admin" && req.body.privileges == "admin") {
            bdd.query('UPDATE posts SET isFlagged="0" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                if(err) {
                    return res.status(500).json({message: 'Erreur lors du traitement de votre requête.'});
                }
                return res.status(200).json({ message: "Le signalement vient d'être retiré."});
            })
        }
    })
}