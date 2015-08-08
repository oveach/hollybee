angular.module('hollybee', ['ngMaterial'])

.controller('AppCtrl', ['$scope', function($scope){
    $scope.testBtnClick = function(){
        alert("test button clicked!");
    };

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
