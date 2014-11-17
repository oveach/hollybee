angular.module('controllers', ['directives'])

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

.factory('expenseDelete', function($modal){
    return {
        tripId: null,
        expense: null,
        confirmDelete: function(tripId, expense){
            this.tripId = tripId;
            this.expense = expense;
            // this var MUST be named "modalInstance", else it doesn't work!!
            var modalInstance = $modal.open({
                templateUrl: 'views/delete_expense.html',
                controller: 'DeleteExpenseCtrl',
                backdrop: 'static'
            });
        }
    };
})

.controller('MenuCtrl', ['$scope', function($scope){
    $scope.menuItems = [{
        'glyph': 'globe',
        'label': 'Trips',
        'route': '#/trips'
    },{
        'glyph': 'wrench',
        'label': 'Setup',
        'route': '#/setup'
    }];
}])

.controller('TripsCtrl', function($scope, $modal, $rootScope, $state, trips, tripDelete, expenseService){
    $scope.trips = trips.getTrips();
    $scope.trips.forEach(function(trip){
        trip.budgetStatus = expenseService.getBudgetStatus(trip.id);
    });

    $scope.delete = function(trip){
        tripDelete.confirmDelete(trip);
    };

    $scope.edit = function(trip){
        $state.go('trips_edit', {tripId: trip.id});
    };
})

.controller('DeleteTripCtrl', function($scope, $modal, $modalInstance, $state, trips, tripDelete){
    $scope.trip = tripDelete.trip;
    $scope.delete = function(trip){
        trips.deleteTrip(trip);
        $modalInstance.close();
        $state.go('trips');
    };
    $scope.cancel = function(){
        $modalInstance.close();
    };
})

.controller('SetupCtrl', function($scope){

})

.controller('TripCtrl', function($scope, $rootScope, $state, $stateParams, trips, tripDelete, expenseService){
    // copy makes the model binding of angular work on a copy of the data
    // this prevents data to be modified without validation with the save button
    if ($stateParams.tripId != null) {
        $scope.trip = angular.copy(trips.getTrip($stateParams.tripId));
        $scope.expensesTotal = expenseService.getTotalForTrip($stateParams.tripId);
    }
    $scope.budgetStatus = expenseService.getBudgetStatus($stateParams.tripId);

    // date picker settings
    $scope.datePickerOptions = {
        'starting-day': 1,
        'month-format': "'MM'"
    };
    $scope.format = 'dd/MM/yyyy';
    $scope.openStartDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedStartDate = true;
    };

    $scope.openEndDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedEndDate = true;
    };

    $scope.cancel = function(){
        $state.go('trips');
    };
    $scope.save = function(trip){
        trips.saveTrip(trip);
        $state.go('trips');
    };
    $scope.delete = function(trip){
        tripDelete.confirmDelete(trip);
    };
})

.controller('ExpensesCtrl', function($scope, $rootScope, $stateParams, $state, trips, expenseService, expenseDelete){
    $scope.trip = trips.getTrip($stateParams.tripId);
    $scope.expenses = expenseService.getExpenses($stateParams.tripId);
    $scope.expensesTotal = expenseService.getTotalForTrip($stateParams.tripId);
    $scope.budgetStatus = expenseService.getBudgetStatus($stateParams.tripId);

    $scope.edit = function(expense){
        $state.go('trips_expenses_edit', {
            tripId: $stateParams.tripId,
            expenseId: expense.id
        });
    };

    $scope.delete = function(expense){
        expenseDelete.confirmDelete($stateParams.tripId, expense);
    };

    $scope.$on('expenseDelete', function(event){
        $scope.expensesTotal = expenseService.getTotalForTrip($stateParams.tripId);
    });
})

.controller('ExpenseCtrl', function($scope, $stateParams, $state, trips, expenseService, expenseDelete){
    $scope.trip = trips.getTrip($stateParams.tripId);

    // copy makes the model binding of angular work on a copy of the data
    // this prevents data to be modified without validation with the save button
    if ($stateParams.expenseId != null) {
        $scope.expense = angular.copy(expenseService.getExpense($stateParams.tripId, $stateParams.expenseId));
    } else {
        // initialize date for new expense
        $scope.expense = {
            date: new Date()
        };
    }
    
    // date picker settings
    $scope.datePickerOptions = {
        'starting-day': 1,
        'month-format': "'MM'"
    };
    $scope.format = 'dd/MM/yyyy';
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    
    $scope.cancel = function(){
        $state.go('trips_expenses', {tripId: $stateParams.tripId});
    };
    $scope.save = function(expense){
        expenseService.saveExpense($stateParams.tripId, expense);
        $state.go('trips_expenses', {tripId: $stateParams.tripId});
    };
    $scope.delete = function(expense){
        expenseDelete.confirmDelete($stateParams.tripId, expense);
    };
})

.controller('DeleteExpenseCtrl', function($scope, $modal, $modalInstance, $state, expenseService, expenseDelete){
    $scope.expense = expenseDelete.expense;
    $scope.tripId = expenseDelete.tripId;
    $scope.delete = function(expense){
        expenseService.deleteExpense(expenseDelete.tripId, expense);
        $modalInstance.close();
        $state.go('trips_expenses', {tripId: expenseDelete.tripId});
    };
    $scope.cancel = function(){
        $modalInstance.close();
    };
})

;