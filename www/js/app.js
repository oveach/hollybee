angular.module('hollybee', ['ngMaterial'])

.controller('AppCtrl', ['$scope', function($scope){
    $scope.testBtnClick = function(){
        alert("test button clicked!");
    };
}])

;
