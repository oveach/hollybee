angular.module('hollybee', ['ui.router', 'ngMaterial', 'controllers', 'services'])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/trips');
    $stateProvider
    .state('trips', {
        url: '/trips',
        controller: 'TripsCtrl',
        templateUrl: 'views/trips.html'
    })
    .state('trips_trip', {
        url: '/trips/:idTrip',
        controller: 'TripCtrl',
        templateUrl: 'views/trip.html'
    })
    ;
})

;
