angular.module('services', [])

.factory('trips', function(){
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
			for (var i = 0; i < trips.data.length; i++) {
                if (trips.data[i].id == id) {
                    return trips.data[i];
                }
            }
		},
        saveTrip: function(trip){
            // new trip ?
            if (trip.id == null) {
                this.addTrip(trip);
            // update existing one
            } else {
                for (var i = 0; i < trips.data.length; i++) {
                    if (trips.data[i].id == trip.id) {
                        trips.data[i] = trip;
                    }
                }
            }
            this.updateStorage();
        },
        addTrip: function(trip){
            var id = trips.lastId + 1;
            trips.lastId = id;
            trip.id = id;
            trips.data.push(trip);
        },
        deleteTrip: function(trip){
            trips.data.splice(trips.data.indexOf(trip), 1);
            this.updateStorage();
        },
        updateStorage: function(){
            localStorage.trips = angular.toJson(trips);
        }
	};
});