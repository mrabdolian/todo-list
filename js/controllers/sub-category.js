app.controller('SubCategoryCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

    $scope.stateIs = function (state) {
        return $state.is(state);
    };

    $scope.addSubCategory = function () {
        console.log("Data: " + $scope.newSubCategory);
        $scope.subCategories.push({
            name: $scope.newSubCategory
        });

        $scope.newSubCategory = '';
    };

    $scope.subCategories = $scope.categories[$stateParams.categoryId].subCategories;


}]);
