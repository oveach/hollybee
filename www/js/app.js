angular.module('hollybee', ['ngRoute', 'ui.bootstrap', 'ngTouch'])

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
		.when('/trip/:tripId', {
			controller: 'TripCtrl',
			templateUrl: 'views/trip.html'
		})
		.when('/expenses', {
			controller: 'ExpenseCtrl',
			templateUrl: 'views/expenses.html'
		})
		.otherwise({
			redirectTo: '/trips'
		});
})

.controller('TripsCtrl', function($scope, $modal){
	$scope.trips = [{
		name: 'Venice',
		startDate: '15/03',
		endDate: '18/03',
		budget: 400 + Math.round(Math.random() * 100)
	},{
		name: 'Montreal',
		startDate: '15/03',
		endDate: '18/03',
		budget: 300 + Math.round(Math.random() * 100)
	},{
		name: 'New-York',
		startDate: '15/03',
		endDate: '18/03',
		budget: 400 + Math.round(Math.random() * 100)
	}];
	
	$scope.showModal = function(){
		// this var MUST be named "modalInstance", else it doesn't work!!
		var modalInstance = $modal.open({
			templateUrl: 'views/modal.html',
			controller: 'TripFormCtrl',
			backdrop: 'static'
		});
	};

	$scope.delete = function(){
		// this var MUST be named "modalInstance", else it doesn't work!!
		var modalInstance = $modal.open({
			templateUrl: 'views/delete_trip.html',
			controller: 'DeleteTripCtrl',
			backdrop: 'static'
		});
	};
})

.controller('DeleteTripCtrl', function($scope, $modalInstance){
	$scope.delete = function(){
		alert("deleting...");
		$modalInstance.close();
	};
	$scope.cancel = function(){
		$modalInstance.close();
	};
})

.controller('TripFormCtrl', function($scope, $modalInstance){
	$scope.cancel = function(){
		$modalInstance.close();
	};
})

.controller('SetupCtrl', function($scope){

})

.controller('TripCtrl', function($scope, $location){
	$scope.cancel = function(){
		$location.path('/');
	};
})

.controller('ExpenseCtrl', function($scope){

})

;
