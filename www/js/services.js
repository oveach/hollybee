angular.module('services', [])

.factory('trips', function(){
	var trips = {
        lastId: 2,
        data: [{
    		id: 0,
    		name: 'Venice',
    		startDate: '15/03',
    		endDate: '18/03',
    		budget: 400 + Math.round(Math.random() * 100)
    	},{
    		id: 1,
    		name: 'Montreal',
    		startDate: '15/03',
    		endDate: '18/03',
    		budget: 300 + Math.round(Math.random() * 100)
    	},{
    		id: 2,
    		name: 'New-York',
    		startDate: '15/03',
    		endDate: '18/03',
    		budget: 400 + Math.round(Math.random() * 100)
    	}]
    };

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
        },
        addTrip: function(trip){
            var id = trips.lastId + 1;
            trips.lastId = id;
            trip.id = id;
            trips.data.push(trip);
        },
        deleteTrip: function(trip){
            trips.data.splice(trips.data.indexOf(trip), 1);
        }
	};
});