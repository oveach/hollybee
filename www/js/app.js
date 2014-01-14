angular.module('hollybee', ['ui.bootstrap'])

.controller('TripsCtrl', function($scope, $modal){
	$scope.showForm = function(){
		// this var MUST be named "modalInstance", else it doesn't work!!
		var modalInstance = $modal.open({
			templateUrl: 'form-trip.html',
			controller: 'TripFormCtrl'
		});
	};
})

.controller('TripFormCtrl', function($scope, $modalInstance){
	$scope.cancel = function(){
		$modalInstance.close();
	};
})

;
