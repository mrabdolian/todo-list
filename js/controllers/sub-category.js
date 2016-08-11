app.controller('ListCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.model = $scope.categories[$stateParams.categoryId];


}]);