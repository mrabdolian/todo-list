app.controller('TaskListCtrl', ['$rootScope', '$scope', '$stateParams', '$filter',
    function ($rootScope, $scope, $stateParams, $filter) {

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

        // define the function for resetting orderBy if filter is set to something other than 'None'
        var fixOrderBy = function () {
            if(!$scope.filters.filter == '' && $scope.filters.orderBy == 'doneDate') {
                $scope.filters.orderBy = 'dueDate';
            }
        };

        // define set filters function
        $scope.setFilter = function () {
            switch ($scope.filters.filter) {
                case 'undone':
                    $scope.filters.filters = {done: false};
                    break;
                case 'important':
                    $scope.filters.filters = {important: true, done: false};
                    break;
                case 'upcoming':
                    $scope.filters.filters = {isClose: true, done: false};
                    break;
                case 'passed':
                    $scope.filters.filters = {isPassed: true, done: false};
                    break;
                // case 'done':
                //     $scope.filters.filters = {done: true};
                //     break;
                default:
                    $scope.filters.filters = {};
                    break;
            }
            fixOrderBy();
        };

        // init filters values
        $scope.filters = {
            search: '',
            filters: {},
            orderBy: 'dueDate',
            direction: ''
        };
        $scope.filters.filter = 'undone';
        $scope.setFilter('undone');

        // init date/time errors to false
        $scope.dueDateError = false;
        $scope.dueTimeError = false;

        // Date Format: if seperator changed, don't forget to change that in regEx string in validateDate() function too.
        $scope.dateFormat = 'yyyy-MM-dd';
        $scope.timeFormat = 'HH:mm';

        // getting subCategory name if present
        $scope.getSubCatName = function () {
            return $scope.hasSubCat ? $rootScope.category.subCategories[$stateParams.subCategoryId].name : '';
        };

        // getting $stateParams.subCategoryId
        $scope.getSubCatId = function () {
            return $stateParams.subCategoryId;
        };

        // define new task object function
        var emptyNewTask = function () {
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


        // define reset editing object function
        var emptyEditing = function () {
            $scope.editing = {
                key: -1,
                bkpTask: {},
                error: false
            };
            $scope.newTaskDueDate = null;
            $scope.newTaskDueTime = null;
        };

        // initialise new task object
        emptyNewTask();

        // initialise editing object
        emptyEditing();

        // the function to finalise adding/editing a task
        $scope.submitTask = function () {
            if (!$scope.dueDateError && !$scope.dueTimeError) {
                if ($scope.editing.key !== -1) {  // if editing an item...
                    emptyEditing();
                    $scope.newTask = {};
                } else {    // if adding a new item...
                    $scope.tasks.push($scope.newTask);
                    emptyNewTask();
                    $scope.focusOn('#newTaskTitle');
                }
            }
        };

        // the function for editing a task
        $scope.editTask = function (key) {
            var task = $scope.tasks[key];
            if ($scope.editing.key !== -1) {  // if editing an item...
                $scope.taskEditCancel();
            }
            $scope.editing = {
                key: angular.copy(key),
                bkpTask: angular.copy(task),
                error: false
            };
            $scope.newTaskDueDate = $filter('date')(task.dueDate, $scope.dateFormat);
            $scope.newTaskDueTime = $filter('date')(task.dueDate, $scope.timeFormat);
            $scope.newTask = task;
            $scope.focusOn('#newTaskTitle');
        };

        // the function for canceling a task editing
        $scope.taskEditCancel = function () {
            $scope.tasks[$scope.editing.key] = $scope.editing.bkpTask;
            emptyEditing();
            $scope.newTask = {};
            $scope.dueDateError = false;
            $scope.dueTimeError = false;
        };

        // the function for deleting a task
        $scope.removeTask = function (key) {
            if ($scope.editing.key === key) {
                $scope.editing.error = true;
            }
            else {
                $scope.tasks.splice(key, 1);
            }
        };

        // the function for setting task done/undone
        $scope.taskDone = function (task) {
            task.doneDate = task.done ? new Date() : null; // TODO: fix this, convert to a filter (if null, return '--')
        };

        // define the function for parsing date with regEx
        var parseDate = function (date) {
            var parts = date.match(/^(\d{1,4})-(\d{1,2})-(\d{1,2})$/);
            if (parts) {
                return new Date(
                    parseInt(parts[1], 10),
                    parseInt(parts[2], 10) - 1,
                    parseInt(parts[3], 10)
                );
            }
            return null;
        };

        // define the function for checking entered date validation
        $scope.validateDate = function (date) {
            if (!date) {
                date = $scope.newTaskDueDate;
            }
            if (date === '') {
                $scope.dueDateError = false;
                return true;
            }
            $scope.newTask.dueDate = parseDate(date);
            if ($scope.newTask.dueDate) {
                $scope.dueDateError = false;
                return true;
            }
            else {
                $scope.dueDateError = true;
                return false;
            }
        };

        // define the function for checking entered time validation
        $scope.validateTime = function (time) {
            if (!time) {
                time = $scope.newTaskDueTime;
            }
            if (time === '') {
                $scope.dueTimeError = false;
                return true;
            }
            var parts = time.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/);
            if (parts) {
                var hours = parseInt(parts[1]);
                var minutes = parseInt(parts[2]);
                ($scope.newTask.dueDate).setHours(hours);
                ($scope.newTask.dueDate).setMinutes(minutes);
                $scope.dueTimeError = false;
                return true;
            }
            else {
                $scope.dueTimeError = true;
                return false;
            }
        };

        // define the function for checking if deadline has passed
        $scope.deadlinePassed = function (task) {
            if (!task.dueDate) { // if dueDate is not set, deadline would never be passed
                return false;
            }
            return (new Date(task.dueDate) < (new Date())); // check if deadline passed, then return
        };

        // define the function for checking if deadline is close (less than 24 hours)
        $scope.deadlineClose = function (task) {
            var now = new Date();
            var due = new Date(task.dueDate);
            var diff = due - now;
            return (diff < 8.64e+7 && diff >= 0); // 24 hours in milliseconds: 8.64e+7
        };

        // add isClose and isPassed to 'task'
        var calculateTaskStatus = function (task) {
            task.isClose = $scope.deadlineClose(task);
            task.isPassed = $scope.deadlinePassed(task);
        };

        // add/refresh isClose and isPassed for all tasks
        angular.forEach($scope.tasks, function (task, key) {
            calculateTaskStatus(task);
        });

        // console.log($scope.tasks);
    }]);