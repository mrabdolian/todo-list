app.controller('DeleteSubCatCtrl', ['$rootScope', '$scope', '$stateParams', '$location',
    function ($rootScope, $scope, $stateParams, $location) {

        $scope.type = 'SubCategory';
        var catId = $stateParams.catId;
        var subCatId = $stateParams.subId;
        $scope.name = $rootScope.categories[catId].subCategories[subCatId].name;

        $scope.delete = function () {
            $rootScope.categories[catId].subCategories.splice(subCatId, 1);
            $rootScope.refreshDoneTasks();
            $location.path('/category/' + catId);
        };

        $scope.cancel = function () {
            if($stateParams.from == 'tasks') {
                $location.path('/category/' + catId + '/sub/' + subCatId);
            }
            else {
                $location.path('/category/' + catId);
            }
        };

    }]);