angular.module('services', [])

.factory('trips', function($filter){
    var trips = {};
    // load trips from localstorage
    if (localStorage.trips) {
        trips = JSON.parse(localStorage.trips);
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
            localStorage.trips = JSON.stringify(trips);
        }
	};
});