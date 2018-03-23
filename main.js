/*
 * Librairies utilisées
 */
var evenement = require('./librairieServer/Evenement');
var bodyParser = require('body-parser');
var express = require('express');

/*
 * Création et configuration de l'application express
 */
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/appliCliente'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

/*
 * Fonctions
 */

//Obtention des informations d'un evenement FAIT
app.get('/evt/:id', function (req, res) {
    var evt = evenement.afficheEvt(req.params.id);
    if (typeof evt.information === 'undefined') {
        res.status(404).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        res.json(evt);
    }
});

//Affiche la liste de tout les évènements
app.get('/liste', function (req, res) {
    var list = evenement.afficheAllEvt();
    res.json(list);
}) ;

//Création d'un event (identifiant fourni à la création) FAIT
app.post('/evt/:id', function (req, res) {
    if (!evenement.creerEvt(req.params.id, req.body.acronyme, req.body.nom, req.body.adresse, req.body.dateOuvIns, req.body.dateFerIns, req.body.nbMaxPar)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} existe déjà.`});
    } else {
        //Ressource créé : on renvoit l'état de la ressource (cad ici sa position)
        res.status(201).json(evenement.afficheEvt(req.params.id));
    }
});

//Création d'un participant (identifiant fourni à la création) FAIT
app.post('/evt/par/:id', function (req, res) {
    if (!evenement.creerPar(req.body.idPar, req.body.nomPar, req.body.prenomPar, req.body.mailPar, req.body.telPar, req.params.id)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        //Ressource créé : on renvoit l'état de la ressource (cad ici sa position)
        res.status(201).json(evenement.affichePar(req.params.id, req.body.idPar));
    }
});

//Changement du type d'un participant qui n'est pas accompagnateur FAIT
app.post('/evt/par/type/:id', function (req, res) {
    if (!evenement.changerType(req.params.id, req.body.idTp, req.body.idPar)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        //Ressource créé : on renvoit l'état de la ressource (cad ici sa position)
        res.status(201).json(evenement.affichePar(req.params.id, req.body.idPar));
    }
});

//Création d'un type (identifiant fourni à la création) FAIT
app.post('/evt/type/:id', function (req, res) {
    if (!evenement.creerType(req.body.idTp, req.body.nomTp, req.body.prixTp, req.body.nbAccTp, req.params.id)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        //Ressource créé : on renvoit l'état de la ressource (cad ici sa position)
        res.status(201).json(evenement.afficheType(req.params.id, req.body.idTp));
    }
});

//Changement du type d'un participant qui est accompagnateur FAIT
app.post('/evt/par/acc/:id', function (req, res) {
    if (!evenement.ajouterAcc(req.params.id, req.body.idPar, req.body.idAcc, req.body.nomAcc, req.body.prenomAcc, req.body.mailAcc, req.body.telAcc)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        //Ressource créé : on renvoit l'état du participant accompagné (cad ici sa position)
        res.status(201).json(evenement.affichePar(req.params.id, req.body.idPar));
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Suppression d'un évènement existant
app.get('/stat', function (req, res) {
    var stat = evenement.statGen();
    res.json(stat);
});

//méthode pour avoir les donnés d'un evt
app.get('/stat/evt/:id', function (req, res) {
    var stat = evenement.statEvt(req.params.id);
    if(!stat){
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas.`});
    } else {
        //Ressource supprimé
        res.status(201).json(stat);
    }
});

//Suppression d'un évènement existant
app.post('/evt/supp/:id', function (req, res) {
    if (!evenement.suppEvt(req.params.id)) {
        res.status(409).json({monErreur: `L'evenement d'id ${req.params.id} n'existe pas, ou n'a pas pu être supprimé.`});
    } else {
        //Ressource supprimé
        res.status(201).json(`L'evenement d'id ${req.params.id} a été supprimé avec succès.`);
    }
});