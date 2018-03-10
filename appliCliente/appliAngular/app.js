/*
 * Déclaration de notre module avec ces dépendances : ici on créé le module
 */
angular.module('myEventApp', ['ui.router', 'ngResource'])
        //Déclaration d'une configuration du module, utilisée pour mettre en place les routes vers les vues
        .config(["$stateProvider", "$urlServiceProvider", function ($stateProvider, $urlServiceProvider) {
                //Création des différents états de l'appli

            }]);
