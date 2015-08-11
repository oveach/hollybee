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

    $scope.expenses = [{
        id: 1,
        label: "Lorem ipsum",
        amount: 10.50,
        date: new Date()
    },{
        id: 2,
        label: "Lorem ipsum",
        amount: 25,
        date: new Date()
    },{
        id: 3,
        label: "Lorem ipsum",
        amount: 123.90,
        date: new Date()
    },{
        id: 4,
        label: "Lorem ipsum",
        amount: 10.50,
        date: new Date()
    },{
        id: 5,
        label: "Lorem ipsum",
        amount: 25,
        date: new Date()
    },{
        id: 6,
        label: "Lorem ipsum",
        amount: 123.90,
        date: new Date()
    }];
}])

;
