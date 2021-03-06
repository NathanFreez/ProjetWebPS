/*
 * Ajout d'un controlleur infosAllEvenementCtrl au module myEventApp. Le module myEventApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myEventApp')
        .controller('infosAllEvenementCtrl', ["$scope", "EvenementFactory", function ($scope, EvtFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" d'obtention de la position du compte
                $scope.afficheAllEvt = function () {
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    delete $scope.evenements;
                    delete $scope.erreur;
                    //Récupère les evenements
                    $scope.evenements = EvtFacto.AllEvenement.get(function () {
                        //evenements récupérées
                        //ici rien à faire
                        console.log($scope.evenements);
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet evenement créé
                        console.log($scope.evenements);
                        //Si le code de retour est un de node code géré, on affichera le message d'erreur personnalisé
                        if (err.status === 404) {
                            $scope.erreur = err.data.monErreur;
                        } else {
                            //Si le code est autre, on affichera le message par défaut avec le numéro du code erreur
                            $scope.erreur = err.statusText + ' (' + err.status + ')';
                        }
                    });
                };
                
                $scope.suppEvt = function (id) {
                    alert("allo");
                    console.log($scope.id);
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    delete $scope.evenement;
                    delete $scope.erreur;
                    //Supprime l'evenement en indiquant l'id de l'evenement pour paramétrer l'url
                    $scope.evenement = EvtFacto.SupprEvenement.get(id, function () {
                        //evenement récupérée
                        //ici rien à faire
                        console.log($scope.evenement);
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet evenement créé
                        console.log($scope.evenement);
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