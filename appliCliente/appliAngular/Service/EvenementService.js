/*
 * Ajout d'un service EvenementFactory au module myEventApp. Le module myEventApp doit avoir été créé précédemment
 */
angular.module('myEventApp')
        .service('EvenementFactory', ['$resource', function ($resource) { //Notre service dépend du service "$resrouce", fournit par le module ngResource
                return {
                    Evenement: $resource('/evt/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            ),
                    AllEvenement: $resource('/', //URL de la ressource
                            ),
                    SupprEvenement: $resource('/evt/supp/:id', //URL de la ressource
                            ),
                    StatsEvenement: $resource('/stat/evt/:id', //URL de la ressource
                            ),
                    StatsGeneral: $resource('/stat', //URL de la ressource
                            )
                };
            }]);

