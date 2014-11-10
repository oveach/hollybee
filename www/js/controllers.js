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

.controller('TripsCtrl', function($scope, $modal, $rootScope, $location, trips, tripDelete, expenseService){
    $scope.trips = trips.getTrips();
    $scope.trips.forEach(function(trip){
        trip.budgetStatus = expenseService.getBudgetStatus(trip.id);
    });

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

.controller('TripCtrl', function($scope, $rootScope, $location, $routeParams, trips, tripDelete, expenseService){
    // copy makes the model binding of angular work on a copy of the data
    // this prevents data to be modified without validation with the save button
    if ($routeParams.tripId != null) {
        $scope.trip = angular.copy(trips.getTrip($routeParams.tripId));
        $scope.expensesTotal = expenseService.getTotalForTrip($routeParams.tripId);
    }
    $scope.budgetStatus = expenseService.getBudgetStatus($routeParams.tripId);

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

.controller('ExpensesCtrl', function($scope, $rootScope, $routeParams, $location, trips, expenseService, expenseDelete){
    $scope.trip = trips.getTrip($routeParams.tripId);
    $scope.expenses = expenseService.getExpenses($routeParams.tripId);
    $scope.expensesTotal = expenseService.getTotalForTrip($routeParams.tripId);
    $scope.budgetStatus = expenseService.getBudgetStatus($routeParams.tripId);

    $scope.edit = function(expense){
        $location.path('/expenses/edit/trip/' + $routeParams.tripId + '/expense/' + expense.id);
    };

    $scope.delete = function(expense){
        expenseDelete.confirmDelete($routeParams.tripId, expense);
    };

    $scope.$on('expenseDelete', function(event){
        $scope.expensesTotal = expenseService.getTotalForTrip($routeParams.tripId);
    });
})

.controller('ExpenseCtrl', function($scope, $routeParams, $location, trips, expenseService, expenseDelete){
    $scope.trip = trips.getTrip($routeParams.tripId);

    // copy makes the model binding of angular work on a copy of the data
    // this prevents data to be modified without validation with the save button
    if ($routeParams.expenseId != null) {
        $scope.expense = angular.copy(expenseService.getExpense($routeParams.tripId, $routeParams.expenseId));
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
        $location.path('/expenses/' + $routeParams.tripId);
    };
    $scope.save = function(expense){
        expenseService.saveExpense($routeParams.tripId, expense);
        $location.path('/expenses/' + $routeParams.tripId);
    };
    $scope.delete = function(expense){
        expenseDelete.confirmDelete($routeParams.tripId, expense);
    };
})

.controller('DeleteExpenseCtrl', function($scope, $modal, $modalInstance, $location, expenseService, expenseDelete){
    $scope.expense = expenseDelete.expense;
    $scope.tripId = expenseDelete.tripId;
    $scope.delete = function(expense){
        expenseService.deleteExpense(expenseDelete.tripId, expense);
        $modalInstance.close();
        $location.path('/expenses/' + expenseDelete.tripId);
    };
    $scope.cancel = function(){
        $modalInstance.close();
    };
})

;