app.controller('DeleteSubCatCtrl', ['$rootScope', '$scope', '$stateParams',
    function ($rootScope, $scope, $stateParams) {

        $scope.type = 'SubCategory';
        $scope.id = $stateParams.subId;
        $scope.name = $rootScope.categories[$stateParams.catId].subCategories[$scope.id].name;

        $scope.delete = function () {
            $rootScope.categories[$stateParams.catId].subCategories.splice($scope.id, 1);
            $location.path('/category');
        };

        $scope.cancel = function () {
            $location.path('/category');
        };

    }]);