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
        }
    };
}])

;