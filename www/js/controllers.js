angular.module('controllers', [])

.factory('tripDelete', function($modal){
    return {
        trip: null,
        confirmDelete: function(trip){
            this.trip = trip;
            // this var MUST be named "modalInstance", else it doesn't work!!
            var modalInstance = $modal.open({
                templateUrl: 'views/delete_trip.html',
                controller: 'DeleteTripCtrl',
                backdrop: 'static'
            });
        }
    };
})

.controller('TripsCtrl', function($scope, $modal, $rootScope, trips, tripDelete){
	$scope.trips = trips.getTrips();

	$scope.delete = function(trip){
        tripDelete.confirmDelete(trip);
    };
})

.controller('DeleteTripCtrl', function($scope, $modal, $modalInstance, $location, trips, tripDelete){
    $scope.trip = tripDelete.trip;
	$scope.delete = function(trip){
		trips.deleteTrip(trip);
		$modalInstance.close();
        $location.path('/');
	};
	$scope.cancel = function(){
		$modalInstance.close();
	};
})

.controller('SetupCtrl', function($scope){

})

.controller('TripCtrl', function($scope, $rootScope, $location, $routeParams, trips, tripDelete){
	$scope.trip = trips.getTrip($routeParams.tripId);
	$scope.cancel = function(){
        $location.path('/');
    };
    $scope.save = function(trip){
        trips.saveTrip(trip);
		$location.path('/');
	};
    $scope.delete = function(trip){
        tripDelete.confirmDelete(trip);
    };
})

.controller('ExpenseCtrl', function($scope){

})

;