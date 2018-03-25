/*
 * Ajout d'un controlleur statsEvenementCtrl au module myEventApp. Le module myEventApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myEventApp')
        .controller('statsEvenementCtrl', ["$scope", "EvenementFactory", function ($scope, EvtFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" d'obtention de la position du compte
                $scope.statEvt = function () {
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    delete $scope.stats;
                    delete $scope.erreur;
                    //Récupère les statistiques de l'evenement en indiquant l'id de l'evenement pour paramétrer l'url
                    $scope.stats = EvtFacto.StatsEvenement.get({id: $scope.evenementUnique.information.id}, function () {
                        //stats récupérée
                        //ici rien à faire
                        console.log($scope.stats);
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet evenement créé
                        console.log($scope.stats);
                        //Si le code de retour est un de node code géré, on affichera le message d'erreur personnalisé
                        if (err.status === 404) {
                            $scope.erreur = err.data.monErreur;
                        } else {
                            //Si le code est autre, on affichera le message par défaut avec le numéro du code erreur
                            $scope.erreur = err.statusText + ' (' + err.status + ')';
                        }
                    });
                };
            }]);