app.controller('TaskListCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.tasks = $scope.subCategories[$stateParams.subCategoryId].tasks;

    $scope.emptyEditing = function () {
        $scope.editing = {
            key: null,
            bkpTask: {},
            error: false
        };
    };

    $scope.emptyEditing();

    $scope.emptyNewTask = function () {
        $scope.newTask = {
            title: '',
            description: '',
            important: false,
            dueDate: null,
            done: false,
            doneDate: null
        };
    };

    $scope.emptyNewTask();

    $scope.focusOnNewTask = function () {
        $('#newTaskTitle').focus();
    };

    $scope.submitTask = function () {
        if ($scope.editing.key !== null) {  // if editing an item...
            $scope.emptyEditing();
            $scope.newTask = {};

        } else {
            $scope.tasks.push($scope.newTask);
            $scope.emptyNewTask();
            $scope.focusOnNewTask();
        }
    };

    $scope.editTask = function (key) {
        if ($scope.editing.key !== null) {  // if editing an item...
            $scope.taskEditCancel();
        }
        $scope.editing = {
            key: angular.copy(key),
            bkpTask: angular.copy($scope.tasks[key]),
            error: false
        };
        $scope.newTask = $scope.tasks[key];
        $scope.focusOnNewTask();
    };

    $scope.taskEditCancel = function () {
        $scope.tasks[$scope.editing.key] = $scope.editing.bkpTask;
        $scope.emptyEditing();
        $scope.newTask = {};
    };

    $scope.removeTask = function (key) {
        if ($scope.editing.key === key) {
            $scope.editing.error = true;
        }
        else {
            $scope.tasks.splice(key, 1);
        }
    };

}]);