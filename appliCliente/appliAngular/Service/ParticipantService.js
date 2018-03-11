/*
 * Ajout d'un service ParticipantFactory au module myEventApp. Le module myEventApp doit avoir été créé précédemment
 */
angular.module('myEventApp')
        .service('ParticipantFactory', ['$resource', function ($resource) { //Notre service dépend du service "$resrouce", fournit par le module ngResource
                return {
                    Participant: $resource('/evt/par/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            ),
                    ChangeTypeParticipant: $resource('/evt/par/type/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            ),
                    Accompagnateur: $resource('/evt/par/acc/:id', //URL de la ressource
                            {id: '@id'}, //Le paramètre 'id' de l'URL doit être trouvé dans l'instance de la ressource sous le nom 'id'
                            )
                };
            }]);

