/*
 * Ajout d'un controlleur statsGeneralCtrl au module myEventApp. Le module myEventApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myEventApp')
        .controller('statsGeneralCtrl', ["$scope", "EvenementFactory", function ($scope, EvtFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" d'obtention de la position du compte
                $scope.statGen = function () {
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    delete $scope.statsGen;
                    delete $scope.erreur;
                    //Récupère les statistiques générales en indiquant l'id de l'evenement pour paramétrer l'url
                    $scope.statsGen = EvtFacto.StatsGeneral.get(function () {
                        //stats récupérée
                        //ici rien à faire
                        console.log($scope.statsGen);
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet evenement créé
                        console.log($scope.statsGen);
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