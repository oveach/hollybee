angular.module('services', [])

.factory('dateService', function(){
    // @see http://aboutcode.net/2013/07/27/json-date-parsing-angularjs.html
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    return {
        // convert json string to pure Date objects recursively
        // to be used after loading object from json serialization
        fromJson: function(input){
            // Ignore things that aren't objects.
            if (typeof input !== "object") return input;

            for (var key in input) {
                if (!input.hasOwnProperty(key)) continue;

                var value = input[key];
                var match;
                // Check for string properties which look like dates.
                if (typeof value === "string" && (match = value.match(regexIso8601))) {
                    var milliseconds = Date.parse(match[0])
                    if (!isNaN(milliseconds)) {
                        input[key] = new Date(milliseconds);
                    }
                } else if (typeof value === "object") {
                    // Recurse into object
                    this.fromJson(value);
                }
            }

            return input;
        }
    }
})

.factory('trips', function($filter, dateService){
    var trips = {};
    // load trips from localstorage
    if (localStorage.trips) {
        trips = dateService.fromJson(angular.fromJson(localStorage.trips));
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

.factory('expenseService', function($filter, $rootScope, trips, dateService){
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
                    this.expenses = dateService.fromJson(angular.fromJson(localStorage[key]));
                    this.tripId = tripId;
                } else {
                    this.tripId = tripId;
                    this.expenses = {
                        lastId: 0,
                        data: []
                    };
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
            var expenseId = expense.id;
            this.loadExpenses(tripId);
            this.expenses.data.splice(this.expenses.data.indexOf(expense), 1);
            this.persist();
            $rootScope.$broadcast('expenseDelete', {
                tripId: tripId,
                expenseId: expenseId
            });
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
        },
        getBudgetStatus: function(tripId){
            var total = this.getTotalForTrip(tripId);
            var trip = trips.getTrip(tripId);
            // if trip doesn't exist, there's no problem for budget! :)
            if (trip == null) {
                return "success";
            };
            // exceed budget ?
            if (total > trip.budget) {
                return "danger";
            // exceed 90% budget ?
            } else if (total >= trip.budget * 0.9) {
                return "warning";
            // below 90% budget
            } else {
                return "success";
            }
        },
        getBudgetRemaining: function(tripId){
            var total = this.getTotalForTrip(tripId);
            var trip = trips.getTrip(tripId);
            return trip.budget - total;
        }
    };
})
;