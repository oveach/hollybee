angular.module('hollybee', ['ngRoute', 'ui.bootstrap', 'ngTouch', 'services', 'controllers'])

.config(function($routeProvider){
	$routeProvider
		.when('/trips', {
			controller: 'TripsCtrl',
			templateUrl: 'views/trips.html'
		})
        .when('/trips/add', {
            controller: 'TripCtrl',
            templateUrl: 'views/trip.html'
        })
		.when('/trips/edit/:tripId', {
			controller: 'TripCtrl',
			templateUrl: 'views/trip.html'
		})
		.when('/expenses/:tripId', {
			controller: 'ExpensesCtrl',
			templateUrl: 'views/expenses.html'
		})
		.when('/expenses/add/:tripId', {
			controller: 'ExpenseCtrl',
			templateUrl: 'views/expense.html'
		})
		.when('/expenses/edit/trip/:tripId/expense/:expenseId', {
			controller: 'ExpenseCtrl',
			templateUrl: 'views/expense.html'
		})
		.when('/setup', {
			controller: 'SetupCtrl',
			templateUrl: 'views/setup.html'
		})
		.otherwise({
			redirectTo: '/trips'
		});
})

;
