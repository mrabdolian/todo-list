app.controller('DoneTasksListCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    $rootScope.activeState = 'doneTasks';

    $scope.orderBy = 'doneDate';

    $scope.hasSubCat = function (doneTask) {
        return doneTask.subCatIndex >= 0;
    };

    $scope.removeDoneTask = function (task) {

        var cat = $rootScope.categories[task.catIndex];

        if($scope.hasSubCat(task)) {
            cat.subCategories[task.subCatIndex].tasks.splice(task.taskIndex, 1);
        }
        else {
            cat.tasks.splice(task.taskIndex, 1);
        }

        $rootScope.doneTasks.splice($rootScope.doneTasks.indexOf(task), 1);
    };

    $scope.removeAll = function () {
        for (var i = $rootScope.doneTasks.length - 1; i >= 0; i--) {
            $scope.removeDoneTask($rootScope.doneTasks[i]);
        }
    };

}]);
