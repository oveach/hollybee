angular.module('services', [])

.factory('tripService', ['$q', function($q){
    var trips = [{
        id: 1,
        name: "Roma",
        startDate: new Date(),
        endDate: new Date(),
        budget: 500
    },{
        id: 2,
        name: "Paris",
        startDate: new Date(),
        endDate: new Date(),
        budget: 8000
    }];

    return {
        getTrips: function(){
            var deferred = $q.defer();
            deferred.resolve(trips);
            return deferred.promise;
        },
        getTrip: function(idTrip){
            var deferred = $q.defer();
            var trip = null;
            angular.forEach(trips, function(item, idx){
                if (item.id == idTrip) {
                    trip = item;
                    return;
                }
            });
            deferred.resolve(trip);
            return deferred.promise;
        },
        saveTrip: function(newTrip){
            var deferred = $q.defer();
            if (newTrip.id) {
                angular.forEach(trips, function(item, idx){
                    if (item.id == newTrip.id) {
                        trips[idx] = newTrip;
                        return;
                    }
                });
            } else {
                newTrip.id = trips.length + 1;
                trips.push(newTrip);
            }
            deferred.resolve(newTrip);
            return deferred.promise;
        },
        deleteTrip: function(idTrip){
            var deferred = $q.defer();
            angular.forEach(trips, function(item, idx){
                if (item.id == idTrip) {
                    trips.splice(idx, 1);
                    return;
                }
            });
            deferred.resolve();
            return deferred.promise;
        },
        getPreviousTrip: function(trip){
            var deferred = $q.defer();
            var currentTripPos = trips.indexOf(trip);
            if (currentTripPos > 0) {
                deferred.resolve(trips[currentTripPos - 1]);
            } else {
                deferred.reject("Top of list reached: no previous trip");
            }
            return deferred.promise;
        },
        getNextTrip: function(trip){
            var deferred = $q.defer();
            var currentTripPos = trips.indexOf(trip);
            if (currentTripPos < trips.length - 1) {
                deferred.resolve(trips[currentTripPos + 1]);
            } else {
                deferred.reject("Bottom of list reached: no next trip");
            }
            return deferred.promise;
        }
    };
}])

;