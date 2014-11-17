angular.module('hollybee', ['ui.router', 'ui.bootstrap', 'ngTouch', 'services', 'controllers'])

.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/trips');
    $stateProvider
        .state('trips', {
            url: '/trips',
            controller: 'TripsCtrl',
            templateUrl: 'views/trips.html'
        })
        .state('trips_add', {
            url: '/trips/add',
            controller: 'TripCtrl',
            templateUrl: 'views/trip.html'
        })
        .state('trips_edit', {
            url: '/trips/:tripId/edit',
            controller: 'TripCtrl',
            templateUrl: 'views/trip.html'
        })
        .state('trips_expenses', {
            url: '/trips/:tripId/expenses',
            controller: 'ExpensesCtrl',
            templateUrl: 'views/expenses.html'
        })
        .state('trips_expenses_add', {
            url: '/trips/:tripId/expenses/add',
            controller: 'ExpenseCtrl',
            templateUrl: 'views/expense.html'
        })
        .state('trips_expenses_edit', {
            url: '/trips/:tripId/expenses/:expenseId',
            controller: 'ExpenseCtrl',
            templateUrl: 'views/expense.html'
        })
        .state('setup', {
            url: '/setup',
            controller: 'SetupCtrl',
            templateUrl: 'views/setup.html'
        })
        ;
})

;
