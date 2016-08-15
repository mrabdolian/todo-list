app.controller('TaskListCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.dueDateError = false;
    $scope.dueTimeError = false;

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
        $scope.newTaskDueDate = null;
        $scope.newTaskDueTime = null;
    };

    $scope.emptyNewTask();

    $scope.focusOnNewTask = function () {
        $('#newTaskTitle').focus();
    };

    $scope.submitTask = function () {
        if ($scope.editing.key !== null) {  // if editing an item...
            $scope.emptyEditing();
            $scope.newTask = {};
        } else {    // if adding a new item...
            if (!$scope.dueDateError) {
                $scope.tasks.push($scope.newTask);
                $scope.emptyNewTask();
                $scope.focusOnNewTask();
            }
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

    $scope.taskDone = function (task) {
        task.doneDate = task.done ? new Date() : null; // TODO: fix this, convert to a filter (if null, return '--')
    };

    $scope.validateDate = function (date) {
        if(!date) {
            date = $scope.newTaskDueDate;
        }
        if(date === '') {
            $scope.dueDateError = false;
            return true;
        }
        var parts = date.match(/^(\d{1,4})-(\d{1,2})-(\d{1,2})$/);
        if (parts) {
            var dt = new Date(parseInt(parts[1], 10),
                parseInt(parts[2], 10) - 1,
                parseInt(parts[3], 10));
            $scope.newTask.dueDate = dt;
            $scope.dueDateError = false;
            return true;
        }
        else {
            $scope.dueDateError = true;
            return false;
        }
    };

    $scope.validateTime = function (time) {
        if(!time) {
            time = $scope.newTaskDueTime;
        }
        if(time === '') {
            $scope.dueTimeError = false;
            return true;
        }
        var parts = time.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/);
        if (parts) {
            var hours = parseInt(parts[1]);
            var minutes = parseInt(parts[2]);
            $scope.newTask.dueDate.setHours(hours);
            $scope.newTask.dueDate.setMinutes(minutes);
            $scope.dueTimeError = false;
            return true;
        }
        else {
            $scope.dueTimeError = true;
            return false;
        }
    };

}]);