/*
 * Déclaration de notre module avec ces dépendances : ici on créé le module
 */
angular.module('myEventApp', ['ui.router', 'ngResource'])
        //Déclaration d'une configuration du module, utilisée pour mettre en place les routes vers les vues
        .config(["$stateProvider", "$urlServiceProvider", function ($stateProvider, $urlServiceProvider) {
                //Création des différents états de l'appli
                $stateProvider
                        .state('creationEvenement', {
                            url: '/creation-evenement',
                            templateUrl: 'Vue/creationEvenement.html',
                            controller: 'creationEvenementCtrl'
                        })
                        .state('suppressionEvenement', {
                            url: '/suppression-evenement',
                            templateUrl: 'Vue/suppressionEvenement.html',
                            controller: 'suppressionEvenementCtrl'
                        })
                        .state('creationParticipant', {
                            url: '/creation-participant',
                            templateUrl: 'Vue/creationParticipant.html',
                            controller: 'creationParticipantCtrl'
                        })
                        .state('creationType', {
                            url: '/creation-type',
                            templateUrl: 'Vue/creationType.html',
                            controller: 'creationTypeCtrl'
                        })
                        .state('changementTypePart', {
                            url: '/changement-type-part',
                            templateUrl: 'Vue/changementTypePart.html',
                            controller: 'changementTypePartCtrl'
                        })
                        .state('changementTypeAcc', {
                            url: '/changement-type-acc',
                            templateUrl: 'Vue/changementTypeAcc.html',
                            controller: 'changementTypeAccCtrl'
                        })
                        .state('infosEvenement', {
                            url: '/infos-evenement',
                            templateUrl: 'Vue/infosEvenement.html',
                            controller: 'infosEvenementCtrl'
                        })
                        .state('infosAllEvenement', {
                            url: '/infos-all-evenement',
                            templateUrl: 'Vue/infosAllEvenement.html',
                            controller: 'infosAllEvenementCtrl'
                        })
                        .state('statsEvenement', {
                            url: '/stats-evenement',
                            templateUrl: 'Vue/statsEvenement.html',
                            controller: 'statsEvenementCtrl'
                        })
                        .state('statsGeneral', {
                            url: '/stats-general',
                            templateUrl: 'Vue/statsGeneral.html',
                            controller: 'statsGeneralCtrl'
                        });
                //Pour tout autre route (url) qui ne correspondrait pas à un des états déclarés précédemment, on redirige vers l'état creation.
                $urlServiceProvider.rules.otherwise({state: 'creationEvenement'});
            }]);
