angular.module('controllers', [])

.controller('TripsCtrl', ['$scope', '$state', 'tripService', function($scope, $state, tripService){
    tripService.getTrips()
    .then(function(trips){
        $scope.trips = trips;
    });

    $scope.viewTrip = function(idTrip){
        $state.go("trip_detail", {idTrip: idTrip});
    };
}])

.controller('TripDetailCtrl', ['$scope', '$state', '$stateParams', '$mdDialog', 'tripService',
function($scope, $state, $stateParams, $mdDialog, tripService){
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

    $scope.deleteTrip = function(idTrip){
        var confirm = $mdDialog.confirm()
            .title("Delete trip ?")
            .content("You're going to delete trip with all expenses!")
            .ok("Delete")
            .cancel("Cancel")
            ;
        $mdDialog.show(confirm).then(function(){
            tripService.deleteTrip(idTrip).then(function(){
                $state.go("trips");
            })
        })
    }
}])

.controller('TripFormCtrl', ['$scope', '$state', '$stateParams', 'tripService', function($scope, $state, $stateParams, tripService){
    tripService.getTrip($stateParams.idTrip)
    .then(function(trip){
        $scope.trip = angular.copy(trip);
    });

    $scope.save = function(){
        tripService.saveTrip($scope.trip)
        .then(function(trip){
            $state.go("trip_detail", {idTrip: trip.id});
        })
    };

    $scope.goBack = function(){
        if ($stateParams.idTrip == "") {
            $state.go("trips");
        } else {
            $state.go("trip_detail", {idTrip: $stateParams.idTrip});
        }
    };

    if ($stateParams.idTrip == "") {
        $scope.title = "New trip";
    } else {
        $scope.title = "Edit trip";
    }
}])

;
