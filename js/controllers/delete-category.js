app.controller('DeleteCatCtrl', ['$rootScope', '$scope', '$stateParams', '$location',
    function ($rootScope, $scope, $stateParams, $location) {

        $scope.type = 'category';
        $scope.id = $stateParams.catId;
        $scope.name = $rootScope.categories[$scope.id].name;

        $scope.delete = function () {
            $rootScope.categories.splice($scope.id, 1);
            console.log($rootScope.categories);
            $location.path('/category');
        };

        $scope.cancel = function () {
            $location.path('/category/' + $scope.id);
        };

    }]);
