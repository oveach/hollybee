angular.module('directives', [])

.directive('menu', function(){
    return {
        restrict: 'E',
        scope: {
            items: '=items'
        },
        templateUrl: 'views/menu.html'
    };
})

.directive('navActive', ['$location', function($location){
    return {
        restrict: 'A',
        link: function(scope, element){
            scope.$on("$routeChangeSuccess", function(){
                if ($location.path().indexOf(scope.item.route.replace('#', '')) > -1) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    }
}])

;