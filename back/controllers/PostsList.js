const bdd = require('../mysqlConfig');

exports.postMessage = (req, res, next) => {
    let syntaxeMessage = /[a-zA-Z0-9 _@ê'(èÉÈÀÊÙ!çà)€^%ù:.;?,+=]{2,250}$/;
    if(syntaxeMessage.test(req.body.message) && req.file != null) {
        let dataPost = {
            authorId: req.body.authorId,
            image: `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`, 
            title: req.body.title,
            category: req.body.category,
            message: req.body.message
        }
        bdd.query('INSERT INTO posts SET ?', dataPost,  (err, resultat) => {
            if(err) {
                console.log(err); 
                res.status(501).json({ message: 'Erreur de transmission'});
                throw err; 
            }
            return res.status(201).json({ message: 'Merci pour votre Post! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur de validation (syntaxe serveur).'});
    }


};

exports.postComment = (req,res, next) => {
    let syntaxeMessage = /[a-zA-Z0-9 _@ê'(èÉÈÀÊÙ!çà)€^%ù:.;?,+=]{2,250}$/;
    if(syntaxeMessage.test(req.body.message)) {
        let dataComment = {
            authorName: req.body.authorName, 
            message: req.body.message,
            authorId: req.body.authorId,
            postId: req.body.postId
        }
        bdd.query('INSERT INTO comments SET ?', dataComment, (err, resultat) => {
            if(err){
                console.log(err);
                res.status(201).json({ message: 'Erreur de transmission'});
                throw err;
            }
            return res.status(201).json({ message: 'Merci pour votre message ! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur de validation (syntaxe serveur).' });
    }
};

exports.getAllPosts = (req, res, next) => {
    bdd.query('SELECT * FROM posts WHERE isFlagged="0" ORDER BY date DESC', (err, resultat) => {
        if(err) throw (err);
        return res.status(200).json({ resultat });
    })
};

exports.getOnePost = (req, res, next) => {
    bdd.query('SELECT * FROM posts WHERE id="'+req.params.id+'"', (err, resultat) => {
        if(err) throw (err);
        return res.status(200).json({ resultat });
    })
};

exports.getComments = (req,res,next) => {
    bdd.query('SELECT comments.*, users.profilPicture, users.division, users.privileges FROM comments JOIN users ON comments.authorId = users.id AND comments.postId="'+req.params.id+'" ORDER BY date ASC', (err, resultat) => {
        if(err) throw err;
        console.log(resultat);
        return res.status(200).json({ resultat });
    })
};