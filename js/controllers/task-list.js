app.controller('TaskListCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.tasks = $scope.subCategories[$stateParams.subCategoryId].tasks;


}]);