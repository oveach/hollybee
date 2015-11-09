angular.module('hollybee', ['ui.router', 'ngMaterial', 'ngdexie', 'ngdexie.ui', 'controllers', 'services'])

.config(function($stateProvider, $urlRouterProvider, ngDexieProvider){
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
    .state('expense_form', {
        url: '/trips/:idTrip/expenses/:idExpense',
        controller: 'ExpenseFormCtrl',
        templateUrl: 'views/expense_form.html'
    })
    ;

    ngDexieProvider.setOptions({name: 'hollybee', debug: false});
    ngDexieProvider.setConfiguration(function(db) {
        db.version(1).stores({
            trips: "++id, name, startDate",
            expenses: "++id, date"
        });
        db.version(2).stores({
            trips: "++id, name, startDate",
            expenses: "++id, idTrip, date"
        });
    });
})

;
