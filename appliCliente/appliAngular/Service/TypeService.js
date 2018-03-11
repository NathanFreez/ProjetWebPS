/*
 * Ajout d'un service TypeFactory au module myEventApp. Le module myEventApp doit avoir été créé précédemment
 */
angular.module('myEventApp')
        .service('TypeFactory', ['$resource', function ($resource) { //Notre service dépend du service "$resrouce", fournit par le module ngResource
                return {
                    Type: $resource('/evt/type/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            )
                };
            }]);

