angular.module('services', [])

.factory('trips', function($filter){
    var trips = {};
    // load trips from localstorage
    if (localStorage.trips) {
        trips = angular.fromJson(localStorage.trips);
    } else {
        // initial structure if empty
    	trips = {
            lastId: 0,
            data: []
        };
    }

	return {
		getTrips: function(){
			return trips.data;
		},
		getTrip: function(id){
            return $filter('filter')(trips.data, {id: id})[0];
		},
        saveTrip: function(trip){
            // new trip ?
            if (trip.id == null) {
                this.addTrip(trip);
            // update existing one
            } else {
                var tripExisting = this.getTrip(trip.id);
                var i = trips.data.indexOf(tripExisting);
                trips.data[i] = trip;
            }
            this.persist();
        },
        addTrip: function(trip){
            var id = trips.lastId + 1;
            trips.lastId = id;
            trip.id = id;
            trips.data.push(trip);
        },
        deleteTrip: function(trip){
            trips.data.splice(trips.data.indexOf(trip), 1);
            this.persist();
        },
        persist: function(){
            localStorage.trips = angular.toJson(trips);
        }
	};
})

.factory('expenseService', function($filter){
    return {
        tripId: null,
        expenses: {
            lastId: 0,
            data: []
        },
        getExpenseKey: function(tripId){
            return "expense_" + tripId;
        },
        loadExpenses: function(tripId){
            if (this.tripId != tripId) {
                var key = this.getExpenseKey(tripId);
                if (localStorage[key]) {
                    this.expenses = angular.fromJson(localStorage[key]);
                    this.tripId = tripId;
                } else {
                    this.tripId = tripId;
                    this.expenses = {
                        lastId: 0,
                        data: []
                    }
                }
            }
        },
        getExpenses: function(tripId){
            this.loadExpenses(tripId);
            return this.expenses.data;
        },
        getExpense: function(tripId, expenseId){
            this.loadExpenses(tripId);
            return $filter('filter')(this.expenses.data, {id: expenseId})[0];
        },
        saveExpense: function(tripId, expense){
            // new ?
            if (expense.id == null) {
                this.addExpense(tripId, expense);
            // update existing one
            } else {
                var expenseExisting = this.getExpense(tripId, expense.id);
                var i = this.expenses.data.indexOf(expenseExisting);
                this.expenses.data[i] = expense;
            }
            this.persist();
        },
        addExpense: function(tripId, expense){
            this.loadExpenses(tripId);
            var id = this.expenses.lastId + 1;
            this.expenses.lastId = id;
            expense.id = id;
            this.expenses.data.push(expense);
        },
        deleteExpense: function(tripId, expense){
            this.loadExpenses(tripId);
            this.expenses.data.splice(this.expenses.data.indexOf(expense), 1);
            this.persist();
        },
        persist: function(){
            var key = this.getExpenseKey(this.tripId);
            localStorage[key] = angular.toJson(this.expenses);
        },
        getTotalForTrip: function(tripId){
            this.loadExpenses(tripId);
            var total = 0;
            this.expenses.data.forEach(function(expense){
                total = total + expense.amount;
            });
            return total;
        }
    };
})
;