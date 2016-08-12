app.controller('TaskListCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.tasks = $scope.subCategories[$stateParams.subCategoryId].tasks;

    $scope.emptyNewTask = function () {
        $scope.newTask = {
            title: '',
            description: '',
            important: false,
            dueDate: '',
            done: false,
            doneDate: ''
        };
    };

    $scope.emptyNewTask();

    $scope.addTask = function () {
        $scope.tasks.push($scope.newTask);
        $scope.emptyNewTask();
    }

}]);