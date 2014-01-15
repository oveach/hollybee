angular.module('hollybee', ['ngRoute', 'ui.bootstrap'])

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
	$scope.showForm = function(){
		// this var MUST be named "modalInstance", else it doesn't work!!
		var modalInstance = $modal.open({
			templateUrl: 'views/form-trip.html',
			controller: 'TripFormCtrl',
			backdrop: 'static'
		});
	};
})

.controller('TripFormCtrl', function($scope, $modalInstance){
	$scope.cancel = function(){
		$modalInstance.close();
	};
})

.controller('SetupCtrl', function($scope){

})

;
