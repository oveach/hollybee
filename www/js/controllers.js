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

.controller('TripDetailCtrl', ['$scope', '$state', '$stateParams', '$mdDialog', 'tripService', 'expenseService',
function($scope, $state, $stateParams, $mdDialog, tripService, expenseService){
    tripService.getTrip($stateParams.idTrip)
    .then(function(trip){
        $scope.trip = trip;
    });

    expenseService.getExpenses($stateParams.idTrip)
    .then(function(expenses){
        $scope.expenses = expenses;
    });

    $scope.deleteTrip = function(idTrip){
        var confirm = $mdDialog.confirm()
            .title("Delete trip?")
            .content("You're going to delete trip with all expenses!")
            .ok("Delete")
            .cancel("Cancel")
            ;
        // TODO: cascade delete all expenses
        $mdDialog.show(confirm).then(function(){
            tripService.deleteTrip(idTrip).then(function(){
                $state.go("trips");
            })
        })
    };

    $scope.showPreviousTrip = function(){
        tripService.getPreviousTrip($scope.trip, "startDate")
        .then(function(prevTrip){
            $state.go("trip_detail", {idTrip: prevTrip.id});
        });
    };

    $scope.showNextTrip = function(){
        tripService.getNextTrip($scope.trip, "startDate")
        .then(function(nextTrip){
            $state.go("trip_detail", {idTrip: nextTrip.id});
        });
    };
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

.controller('ExpenseFormCtrl', ['$scope', '$stateParams', '$state', '$mdDialog', 'expenseService',
function($scope, $stateParams, $state, $mdDialog, expenseService){
    $scope.idTrip = $stateParams.idTrip;

    expenseService.getExpense($stateParams.idExpense)
    .then(function(expense){
        $scope.expense = expense;
    });

    $scope.save = function(expense){
        // automatically assign trip to expense
        expense.idTrip = $stateParams.idTrip;
        // save expense in db
        expenseService.saveExpense(expense)
        .then(function(expense){
            $state.go("trip_detail", {idTrip: $stateParams.idTrip});
        });
    };

    $scope.deleteExpense = function(idExpense){
        var confirm = $mdDialog.confirm()
            .title("Delete expense?")
            .content("Are you sure you want to delete this expense?")
            .ok("Delete")
            .cancel("Cancel")
            ;
        $mdDialog.show(confirm).then(function(){
            expenseService.deleteExpense(idExpense)
            .then(function(){
                $state.go("trip_detail", {idTrip: $stateParams.idTrip});
            });
        })
    }
}])

;
