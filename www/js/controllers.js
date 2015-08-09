angular.module('controllers', [])

.controller('TripsCtrl', ['$scope', function($scope){
    $scope.trips = [{
        name: "Roma",
        startDate: new Date(),
        endDate: new Date(),
        budget: 500
    },{
        name: "Paris",
        startDate: new Date(),
        endDate: new Date(),
        budget: 8000
    }];
}])

;
