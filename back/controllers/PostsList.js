const bdd = require('../mysqlConfig');

exports.postMessage = (req, res, next) => {
    let syntaxeMessage = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
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
                res.status(501).json({ message: 'Erreur dans le post '});
                throw err; 
            }
            return res.status(201).json({ message: 'Post effectué ! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises '});
    }


};

exports.postComment = (req,res, next) => {
    let syntaxeMessage = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;
    if(syntaxeMessage.test(req.body.message)) {
        let dataComment = {
            idPost: req.body.postId,
            auteur: req.body.auteur, 
            message: req.body.message,
            idAuteur: req.body.idAuteur
        }
        bdd.query('INSERT INTO comments SET ?', dataComment, (err, resultat) => {
            if(err){
                console.log(err);
                res.status(201).json({ message: 'Erreur dans les données transmises'});
                throw err;
            }
            return res.status(201).json({ message: 'Réponse postée ! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans la syntaxe message' });
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
    bdd.query('SELECT comments.*, users.profilPicture FROM comments JOIN users ON comments.authorId = users.id AND comments.postId="'+req.params.id+'" ORDER BY id DESC', (err, resultat) => {
        if(err) throw err;
        console.log(resultat);
        return res.status(200).json({ resultat });
    })
};