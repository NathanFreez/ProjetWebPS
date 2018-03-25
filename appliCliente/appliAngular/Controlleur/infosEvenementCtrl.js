/*
 * Ajout d'un controlleur infosEvenementCtrl au module myEventApp. Le module myEventApp doit avoir été créé précédemment (cf commentaire sur index.html)
 */
angular.module('myEventApp')
        .controller('infosEvenementCtrl', ["$scope", "$window", "EvenementFactory", function ($scope, $window, EvtFacto) { //Injection du $scope mais également de notre service CompteFactory
                //Fonction "publique" d'obtention de la position du compte
                $scope.afficheEvt = function () {
                    //$window.location.replace("#!/creation-type");
                    //console.log($window.document.getElementById('ici'));
                    //Supprime l'ancienne position et l'ancien message d'erreur si présent
                    console.log('cc');
                    delete $scope.evenementUnique;
                    delete $scope.erreur;
                    //Récupère l'evenement en indiquant l'id de l'evenement pour paramétrer l'url
                    $scope.evenementUnique = EvtFacto.Evenement.get({id: $scope.idEvent}, function () {
                        //evenement récupérée
                        //ici rien à faire
                        console.log($scope.evenementUnique);
                    }, function (err) {
                        //une erreur est survenue : on supprime l'objet evenement créé
                        console.log($scope.evenementUnique);
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