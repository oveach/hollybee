angular.module('hollybee', ['ui.router', 'ngMaterial', 'controllers', 'services'])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/trips');
    $stateProvider
    .state('trips', {
        url: '/trips',
        controller: 'TripsCtrl',
        templateUrl: 'views/trips.html'
    })
    .state('trip_detail', {
        url: '/trips/:idTrip/detail',
        controller: 'TripDetailCtrl',
        templateUrl: 'views/trip_detail.html'
    })
    .state('trip_form', {
        url: '/trips/:idTrip',
        controller: 'TripFormCtrl',
        templateUrl: 'views/trip_form.html'
    })
    ;
})

;
