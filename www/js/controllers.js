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

.controller('TripsCtrl', function($scope, $modal, $rootScope, $location, trips, tripDelete){
	$scope.trips = trips.getTrips();

	$scope.delete = function(trip){
        tripDelete.confirmDelete(trip);
    };

    $scope.edit = function(trip){
        $location.path('/trips/edit/' + trip.id);
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
    // copy makes the model binding of angular work on a copy of the data
    // this prevents data to be modified without validation with the save button
	$scope.trip = angular.copy(trips.getTrip($routeParams.tripId));
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