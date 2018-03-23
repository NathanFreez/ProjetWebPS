/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var listeEvenements = {};

// Constructeur pour les Positions
function InformationEvt(id, acronyme, nom, adresse, dateOuvIns, dateFerIns, nbMaxPar) {
    // l'id de l'évènement
    this.id = id;
    // l'acronyme de l'évènement
    this.acronyme = acronyme;
    // le nom de l'évènement
    this.nom = nom;
    // l'adresse de l'évènement
    this.adresse = adresse;
    // la date d'ouverture des inscriptions à l'évènement
    this.dateOuvIns = dateOuvIns;
    // la date de fermeture des inscriptions à l'évènement
    this.dateFerIns = dateFerIns;
    // le nombre maximal de participants
    this.nbMaxPar = nbMaxPar;
}

function Type(id, nom, prix, nbAcc) {
    //l'id du type
    this.id = id;
    //le nom du type
    this.nom = nom;
    //le prix à payer pour le type actuel
    this.prix = prix;
    //le nombre d'accompagnateur pour le type actuel
    this.nbAcc = nbAcc;
}

function InformationPar(idPar, nomPar, prenomPar, mailPar, telPar) {
    // l'id du participant
    this.idPar = idPar;
    // le nom du participant
    this.nomPar = nomPar;
    // le prenom du participant
    this.prenomPar = prenomPar;
    // le mail du participant
    this.mailPar = mailPar;
    // le telephone du participant
    this.telPar = telPar;
}

function Participant(idPar, nomPar, prenomPar, mailPar, telPar, idevt) {
    // les information du participant
    this.information = new InformationPar(idPar, nomPar, prenomPar, mailPar, telPar);
    // la liste des accompagnateur du participant*
    this.listeAccompagnateur = {};
    //le nombre d'accompagnateur actuel
    this.tailleListAcc = 0;
    // la méthode pour ajouter des accompagnateurs
    this.ajouterAcc = function (idPar, nomPar, prenomPar, mailPar, telPar, idevt) {
            //on créé le participant et on change son type en accompagnateur et on l'assigne au participant à accompagner
            listeEvenements[idevt].ajouterPar(idPar, nomPar, prenomPar, mailPar, telPar);
            listeEvenements[idevt].listeParticipants[idPar].type="Accompagnateur";
            this.tailleListAcc = this.tailleListAcc + 1;
            this.listeAccompagnateur[this.tailleListAcc] = listeEvenements[idevt].listeParticipants[idPar];
    }
    //le type du participant choisit parmis les types de l'evt au quel il s'inscrit de base le type est "normal" soit le type des accompagnateurs
    this.type = "Normal";
    //méthode pour changer le type du participant suivant le type choisit parmis les type de l'evt
    this.changerType = function (idevt, idTp) {
        if (listeEvenements[idevt].listeType[idTp] !== 0) {
            this.type = listeEvenements[idevt].listeType[idTp];
        }
    }
}

function Evenement(id, acronyme, nom, adresse, dateOuvIns, dateFerIns, nbMaxPar) {
    // les information de l'evenement
    this.information = new InformationEvt(id, acronyme, nom, adresse, dateOuvIns, dateFerIns, nbMaxPar);
    // la liste de participants d'un évènement
    this.listeParticipants = {};
    // le nombre de participants actuel
    this.tailleListPart = 0;
    // la méthode pour ajouter un participant
    this.ajouterPar = function (idPar, nomPar, prenomPar, mailPar, telPar) {
            this.listeParticipants[idPar] = new Participant(idPar, nomPar, prenomPar, mailPar, telPar);
            this.tailleListPart = this.tailleListPart + 1;
    }
    //liste des types acceptés pendant l'évènement
    this.listeType = {};
    //la méthode pour ajouter un type à la listes des types
    this.ajouterType = function (idTp, nomTp, prixTp, nbAccTp) {
        this.listeType[idTp] = new Type(idTp, nomTp, prixTp, nbAccTp);
    }
}

// créer un nouveau évènement
var creerEvt = function (id, acronyme, nom, adresse, dateOuvIns, dateFerIns, nbMaxPar) {
    // s'il n'existe pas
    if (typeof listeEvenements[id] === 'undefined') {
        // on le cree
        listeEvenements[id] = new Evenement(id, acronyme, nom, adresse, dateOuvIns, dateFerIns, nbMaxPar);
        return 1;
    }
    return 0;
}

// créer un nouveau type
var creerType = function (idTp, nomTp, prixTp, nbAccTp, id) {
    // si l'evt existe
    if (typeof listeEvenements[id] !== 'undefined') {
        // on regarde si le type n'es pas déjà dans la liste des Type de l'évènement
        if (typeof listeEvenements[id].listeType[idTp] === 'undefined') {
            //on l'ajoute à l'évènement
            listeEvenements[id].ajouterType(idTp, nomTp, prixTp, nbAccTp);
            return 1;
        }
    }
    return 0;
}

// créer un nouveau évènement
var creerPar = function (idPar, nomPar, prenomPar, mailPar, telPar, id) {
    // si l'evenement existe
    if (typeof listeEvenements[id] !== 'undefined') {
        // on regarde si le participant n'es pas déjà dans la liste des Participants à l'évènement
        if (typeof listeEvenements[id].listeParticipants[idPar] === 'undefined') {
            //on l'ajoute à l'évènement
            listeEvenements[id].ajouterPar(idPar, nomPar, prenomPar, mailPar, telPar);
            return 1;
        }
    }
    return 0;
}

// pour afficher les informations de l'évènement
var afficheEvt = function (id) {
    //console.log(listeEvenements);
    // s'il n'existe pas
    if (typeof listeEvenements[id] === 'undefined')
        return {};
    return listeEvenements[id];
}

//pour afficher les information d'un participant à un evenement
var affichePar = function (id, idPar) {
    // s'il n'existe pas
    if (typeof listeEvenements[id] === 'undefined')
        return {};
    return listeEvenements[id].listeParticipants[idPar];
}

//pour afficher un type d'un évènement
var afficheType = function (id, idTp) {
    // s'il n'existe pas
    if (typeof listeEvenements[id] === 'undefined')
        return {};
    return listeEvenements[id].listeType[idTp];
}

//pour afficher toute la liste des évènements
var afficheAllEvt = function () {
    return listeEvenements;
}

//pour changer le type d'un participant
var changerType = function (idevt, idTp, idPar) {
    //si l'évènement existe
    if (typeof listeEvenements[idevt] !== 'undefined') {
        //si le participant existe dans la liste de l'évènement
        if (typeof listeEvenements[idevt].listeParticipants[idPar] !== 'undefined') {
            listeEvenements[idevt].listeParticipants[idPar].changerType(idevt, idTp);
            return 1;
        }
    }
    return 0;
}

//pour ajouter un accompagnateur en fonction du type du participant accompagné
var ajouterAcc = function (idevt, idPar, idAcc, nomAcc, prenomAcc, mailAcc, telAcc) {
    //si l'évènement existe
    if (typeof listeEvenements[idevt] !== 'undefined') {
        //si le participant existe dans la liste de l'évènement
        if (typeof listeEvenements[idevt].listeParticipants[idPar] !== 'undefined') {
            //si le participant a un type pouvant être accompagné
            if (listeEvenements[idevt].listeParticipants[idPar].type !== 'Normal') {
                //si la liste d'accompagnateur n'est pas déjà pleine
                if (listeEvenements[idevt].listeParticipants[idPar].tailleListAcc<listeEvenements[idevt].listeParticipants[idPar].type.nbAcc){
                    //si la liste de participant à l'évènement n'est pas déjà pleine
                    if(listeEvenements[idevt].tailleListPart<listeEvenements[idevt].information.nbMaxPar){
                        listeEvenements[idevt].listeParticipants[idPar].ajouterAcc(idAcc, nomAcc, prenomAcc, mailAcc, telAcc, idevt);
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}

//suppression d'un evt
var suppEvt = function (idevt){
    //si l'évènement existe
    if (typeof listeEvenements[idevt] !== 'undefined') {
        delete listeEvenements[idevt];
        return 1;
    }
    return 0;
}

// les 4 fonctions exportées
exports.creerEvt = creerEvt;
exports.afficheEvt = afficheEvt;
exports.creerPar = creerPar;
exports.affichePar = affichePar;
exports.creerType = creerType;
exports.afficheAllEvt = afficheAllEvt;
exports.afficheType = afficheType;
exports.changerType = changerType;
exports.ajouterAcc = ajouterAcc;
exports.suppEvt = suppEvt;

