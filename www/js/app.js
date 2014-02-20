angular.module('hollybee', ['ngRoute', 'ui.bootstrap', 'ngTouch', 'services', 'controllers'])

.config(function($routeProvider){
	$routeProvider
		.when('/trips', {
			controller: 'TripsCtrl',
			templateUrl: 'views/trips.html'
		})
		.when('/setup', {
			controller: 'SetupCtrl',
			templateUrl: 'views/setup.html'
		})
        .when('/trips/add', {
            controller: 'TripCtrl',
            templateUrl: 'views/trip.html'
        })
		.when('/trips/edit/:tripId', {
			controller: 'TripCtrl',
			templateUrl: 'views/trip.html'
		})
		.when('/expenses', {
			controller: 'ExpenseCtrl',
			templateUrl: 'views/expenses.html'
		})
		.when('/expense', {
			// controller: 'ExpenseCtrl',
			templateUrl: 'views/expense.html'
		})
		.otherwise({
			redirectTo: '/trips'
		});
})

;
