angular.module('controllers', [])

.controller('TripsCtrl', ['$scope', '$state', 'tripService', function($scope, $state, tripService){
    tripService.getTrips()
    .then(function(trips){
        $scope.trips = trips;
    });

    $scope.viewTrip = function(idTrip){
        $state.go("trips_trip", {idTrip: idTrip});
    };
}])

.controller('TripCtrl', ['$scope', '$stateParams', 'tripService', function($scope, $stateParams, tripService){
    tripService.getTrip($stateParams.idTrip)
    .then(function(trip){
        $scope.trip = trip;
    });
}])

;
