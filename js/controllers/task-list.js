app.controller('TaskListCtrl', ['$rootScope', '$scope', '$stateParams', '$filter', '$state', function ($rootScope, $scope, $stateParams, $filter, $state) {

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

    $scope.filtered = $scope.tasks;

    // set paging properties
    $scope.itemsPerPage = 5;
    $scope.totalItems = $scope.filtered.length;
    $scope.currentPage = 1;
    $scope.maxSize = 3;

    $scope.sortableOptions = {
        'ui-floating': true,
        handle: '.reorder-handle',
        disabled: true
    };

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    // define the function for resetting orderBy if filter is set to something other than 'None'
    var fixOrderBy = function () {
        if ($scope.filters.filter != '' && ($scope.filters.orderBy == 'doneDate' || $scope.filters.orderBy == 'custom')) {
            $scope.filters.orderBy = 'dueDate';
        }
    };

    // define set filters function
    $scope.filterChange = function () {
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
            default:
                $scope.filters.filters = {};
                break;
        }
        fixOrderBy();
    };

    // init filters values
    $scope.filters = {
        search: '',
        filter: 'undone',
        filters: {},
        orderBy: 'dueDate',
        direction: ''
    };
    $scope.filterChange('undone');

    // to disable some options in UI
    $scope.isAnyFilterActive = function () {
        return $scope.filters.filter != '';
    };

    // update filtered model function
    var updateFiltered = function () {
        $scope.filtered = $filter('filter')($scope.tasks, $scope.filters.filters);
        $scope.filtered = $filter('filter')($scope.filtered, $scope.filters.search);
        $scope.filtered = $filter('orderBy')($scope.filtered, $scope.filters.orderBy, $scope.filters.direction);
        $scope.totalItems = $scope.filtered.length;
        $scope.filtered = $filter('startFrom')($scope.filtered, (($scope.currentPage - 1) * $scope.itemsPerPage));
        $scope.filtered = $filter('limitTo')($scope.filtered, $scope.itemsPerPage);
        if ($scope.currentPage > $scope.numOfPages) {
            $scope.currentPage = 1;
        }
    };

    $scope.$watchCollection('filters', function () {
        console.log('filters $watch triggered');
        updateFiltered();
    });

    $scope.$watch('tasks', function () {
        console.log('tasks $watch triggered');
        updateFiltered();
    }, true);

    $scope.$watch('itemsPerPage', function () {
        console.log('itemsPerPage $watch triggered');
        if ($scope.itemsPerPage == 'noLimit') {
            $scope.filtered = $filter('filter')($scope.tasks, $scope.filters.filters);
            $scope.filtered = $filter('filter')($scope.filtered, $scope.filters.search);
            $scope.filtered = $filter('orderBy')($scope.filtered, $scope.filters.orderBy, $scope.filters.direction);
            $scope.totalItems = $scope.filtered.length;
            $scope.currentPage = 1;
        }
        else {
            updateFiltered();
        }
        localStorage.setItem("itemsPerPage", $scope.itemsPerPage);
    });

    $scope.$watch('currentPage', function () {
        console.log('currentPage $watch triggered');
        updateFiltered();
    });

    // load data from localStorage if available ///////////////////////////////
    if (localStorage.direction) {
        $scope.filters.direction = localStorage.getItem("direction");
    }

    if (localStorage.orderBy) {
        var orderBy = localStorage.getItem("orderBy");
        if (orderBy == 'custom') {
            $scope.filters.filter = '';
            $scope.filterChange('');
        }
        $scope.filters.orderBy = orderBy;
    }

    if (!localStorage.itemsPerPage) {
        localStorage.setItem("itemsPerPage", 5);
    }
    $scope.itemsPerPage = localStorage.getItem("itemsPerPage");
    ///////////////////////////////////////////////////////////////////////////

    $scope.$watch('filters.orderBy', function () {
        console.log('filters.orderBy $watch triggered');
        $scope.sortableOptions.disabled = ($scope.filters.orderBy != 'custom');
        localStorage.setItem("orderBy", $scope.filters.orderBy);
    });

    $scope.$watch('filters.direction', function () {
        console.log('filters.direction $watch triggered');
        localStorage.setItem("direction", $scope.filters.direction);

    });

    // init date/time errors to false
    $scope.dueDateError = false;
    $scope.dueTimeError = false;

    // getting subCategory name if present
    $scope.getSubCatName = function () {
        return $scope.hasSubCat ? $rootScope.category.subCategories[$stateParams.subCategoryId].name : '';
    };

    // getting $stateParams.subCategoryId
    $scope.getSubCatId = function () {
        return $stateParams.subCategoryId;
    };

    // the function for checking if the state is changed to hide tasks and show task details
    $scope.stateIs = function (state) {
        return $state.is(state);
    };

    // getting a task id
    $scope.getTaskId = function (task) {
        return $scope.tasks.indexOf(task);
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

            } else {  // if adding a new item...
                $scope.tasks.push($scope.newTask);
                emptyNewTask();
                $scope.focusOn('#newTaskTitle');
            }
        }
    };

    // the function for editing a task
    $scope.editTask = function (task) {

        // get the key in main array ($scope.tasks)
        var key = $scope.tasks.indexOf(task);

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
    $scope.removeTask = function (task) {

        // get the key in main array ($scope.tasks)
        var key = $scope.tasks.indexOf(task);

        if ($scope.editing.key == key) {
            $scope.editing.error = true;
        }
        else {
            $scope.tasks.splice(key, 1);
        }
    };

    // the function for setting task done/undone
    $scope.taskDone = function (task) {
        task.doneDate = task.done ? new Date() : null; // TODO: fix this, convert to a filter (if null, return '--')
        $rootScope.refreshDoneTasks();
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

}]);