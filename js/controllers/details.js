app.controller('TaskDetailsCtrl', ['$rootScope', '$scope', '$stateParams', function ($rootScope, $scope, $stateParams) {

    $scope.hasSubCat = null;

    // check to see whether this category has subCategories or not
    if ($stateParams.subCategoryId === '-1') {
        $scope.hasSubCat = false;
        $scope.tasks = $rootScope.category.tasks;
    }
    else {
        $scope.hasSubCat = true;
        $scope.tasks = $rootScope.category.subCategories[$stateParams.subCategoryId].tasks;
    }

    $scope.task = $scope.tasks[$stateParams.taskId];

    // getting subCategory name if present
    $scope.getSubCatName = function () {
        return $scope.hasSubCat ? $rootScope.category.subCategories[$stateParams.subCategoryId].name : '';
    };

    // getting $stateParams.subCategoryId
    $scope.getSubCatId = function () {
        return $stateParams.subCategoryId;
    };

    // the function for deleting a task
    $scope.removeTask = function () {

        // get the key in main array ($scope.tasks)
        var key = $scope.tasks.indexOf($scope.tasks);
        $scope.tasks.splice(key, 1);
    };

    // the function for setting task done/undone
    $scope.taskDone = function () {
        $scope.task.doneDate = $scope.task.done ? new Date() : null;
        $rootScope.refreshDoneTasks();
    };

    // define the function for checking if deadline has passed
    $scope.deadlinePassed = function () {
        if (!$scope.task.dueDate) { // if dueDate is not set, deadline would never be passed
            return false;
        }
        return (new Date($scope.task.dueDate) < (new Date())); // check if deadline passed, then return
    };

    // define the function for checking if deadline is close (less than 24 hours)
    $scope.deadlineClose = function () {
        var now = new Date();
        var due = new Date($scope.task.dueDate);
        var diff = due - now;
        return (diff < 8.64e+7 && diff >= 0); // 24 hours in milliseconds: 8.64e+7
    };

    // add isClose and isPassed to task
    $scope.task.isClose = $scope.deadlineClose();
    $scope.task.isPassed = $scope.deadlinePassed();

}]);