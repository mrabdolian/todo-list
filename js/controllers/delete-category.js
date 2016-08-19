app.controller('DeleteCatCtrl', ['$rootScope', '$scope', '$stateParams', '$location',
    function ($rootScope, $scope, $stateParams, $location) {

        $scope.type = 'category';
        var catId = $stateParams.catId;
        $scope.name = $rootScope.categories[catId].name;

        $scope.delete = function () {
            $rootScope.categories.splice(catId, 1);
            $rootScope.refreshDoneTasks();
            $location.path('/category');
        };

        $scope.cancel = function () {
            $location.path('/category/' + catId);
        };

    }]);
