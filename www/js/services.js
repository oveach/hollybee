angular.module('services', [])

.factory('tripService', ['$q', 'ngDexie', function($q, ngDexie){
    return {
        getTrips: function(){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.orderBy('startDate').toArray().then(function(trips){
                    deferred.resolve(trips);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        getTrip: function(idTrip){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.get(parseInt(idTrip)).then(function(trip){
                    deferred.resolve(trip);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        saveTrip: function(newTrip){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.put(newTrip).then(function(id){
                    newTrip.id = id;
                    deferred.resolve(newTrip);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        deleteTrip: function(idTrip){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.delete(parseInt(idTrip)).then(function(){
                    deferred.resolve();
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        getPreviousTrip: function(trip, attribute){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.where(attribute).below(trip[attribute]).limit(1)
                .first(function(trip){
                    if (typeof trip == "undefined") {
                        deferred.reject("Top of list reached: no previous trip");
                    } else {
                        deferred.resolve(trip);
                    }
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        getNextTrip: function(trip, attribute){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.trips.where(attribute).above(trip[attribute]).limit(1)
                .first(function(trip){
                    if (typeof trip == "undefined") {
                        deferred.reject("Bottom of list reached: no next trip");
                    } else {
                        deferred.resolve(trip);
                    }
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        }
    };
}])

.factory('expenseService', ['$q', 'ngDexie', function($q, ngDexie){
    return {
        getExpenses: function(idTrip){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.expenses.where("idTrip").equals(idTrip).sortBy("date").then(function(expenses){
                    deferred.resolve(expenses);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        getExpense: function(idExpense){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.expenses.get(parseInt(idExpense)).then(function(expense){
                    deferred.resolve(expense);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        saveExpense: function(newExpense){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.expenses.put(newExpense).then(function(id){
                    newExpense.id = id;
                    deferred.resolve(newExpense);
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        },
        deleteExpense: function(idExpense){
            var deferred = $q.defer();
            ngDexie.getDb(function(db){
                db.expenses.delete(parseInt(idExpense)).then(function(){
                    deferred.resolve();
                }, function(rejection){
                    deferred.reject(rejection);
                });
            });
            return deferred.promise;
        }
    }
}])

;
