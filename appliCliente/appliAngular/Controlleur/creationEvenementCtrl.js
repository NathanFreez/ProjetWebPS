/*
 * Ajout d'un controlleur creationEvenementCtrl au module myEventApp. Le module myEventApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myEventApp')
        .controller('creationEvenementCtrl', ["$scope", "EvenementFactory", function ($scope, EvtFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" de creation d'evenement
                $scope.creerEvt = function () {
                    //positionnement de l'indicateur de traitement en cours
                    $scope.traitement = {termine: false};
                    //Création d'evenement (envoie d'un POST à l'URL de la ressource)
                    $scope.evenement.$save(function () {
                        //Création OK, on indique juste que le traitement est terminée
                        $scope.traitement.termine = true;
                    }, function (err) {
                        //Une erreur est survenue, on indique que le traitement est terminée
                        $scope.traitement.termine = true;
                        //Si le code de retour est un de node code géré, on affichera le message d'erreur personnalisé
                        if (err.status === 400 || err.status === 409) {
                            $scope.traitement.erreur = err.data.monErreur;
                        } else {
                            //Si le code est autre, on affichera le message par défaut avec le numéro du code erreur
                            $scope.traitement.erreur = err.statusText + ' (' + err.status + ')';
                        }
                    });
                };

                //A l'initialisation du controlleur : initialise les données du scope
                $scope.evenement = new EvtFacto.Evenement(); //Création d'une nouvelle instance de ressource Evenement
                $scope.traitement = {termine: false}; //Mise en place de l'indicateur de traitement terminé
            }]);
