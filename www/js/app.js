angular.module('hollybee', ['ui.router', 'ngMaterial', 'controllers'])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/trips');
    $stateProvider
    .state('trips', {
        url: '/trips',
        controller: 'TripsCtrl',
        templateUrl: 'views/trips.html'
    })
    ;
})

;
