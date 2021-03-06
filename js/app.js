var app = angular.module('todoListApp', ['ui.router', 'ui.bootstrap', 'ui.sortable']);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Set default route
    $urlRouterProvider.otherwise('/category');


    $stateProvider

        .state('category', {
            url: '/category',
            templateUrl: 'views/category.html',
            controller: 'CategoryCtrl'
        })

        .state('category.categoryId', {
            url: '/:categoryId',
            templateUrl: 'views/sub-category.html',
            controller: 'SubCategoryCtrl'
        })

        .state('category.categoryId.subCategoryId', {
            url: '/sub/:subCategoryId',
            templateUrl: 'views/task-list.html',
            controller: 'TaskListCtrl'
        })

        .state('category.categoryId.subCategoryId.taskId', {
            url: '/task/:taskId',
            templateUrl: 'views/details.html',
            controller: 'TaskDetailsCtrl'
        })

        .state('category.doneTasks', {
            url: '^/doneTasks',
            templateUrl: 'views/done-tasks.html',
            controller: 'DoneTasksListCtrl'
        })

        .state('delete', {
            url: '/delete',
            abstract: true,
            template: '<div ui-view></div>'
        })

        .state('delete.cat', {
            url: '/cat/:catId',
            templateUrl: 'views/delete.html',
            controller: 'DeleteCatCtrl'
        })

        .state('delete.subCat', {
            url: '/sub/:catId/:subId?from',
            templateUrl: 'views/delete.html',
            controller: 'DeleteSubCatCtrl'
        })
}]);

app.controller('MainCtrl', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

    // Date Format: if seperator changed, don't forget to change that in regEx string in validateDate() function too.
    $rootScope.dateFormat = 'yyyy-MM-dd';
    $rootScope.timeFormat = 'HH:mm';

    $rootScope.categories = [
        {
            name: 'Personal',
            hasSubCat: true,
            subCategories: [
                {
                    name: '2016',
                    tasks: [
                        {
                            "title": "Buy Milk",
                            "description": "Buy milk at 6 O'clock.",
                            "important": false,
                            "dueDate": "2016-08-18T01:30:00.000Z",
                            "done": false,
                            "doneDate": null
                        },
                        {
                            "title": "Read Book",
                            "description": "Start reading a new roman.",
                            "important": false,
                            "dueDate": "2016-08-19T13:00:00.000Z",
                            "done": false,
                            "doneDate": null
                        },
                        {
                            "title": "Go to University",
                            "description": "Go to class 512.",
                            "important": true,
                            "dueDate": "2016-08-19T02:00:00.000Z",
                            "done": false,
                            "doneDate": null
                        },
                        {
                            "title": "Learn Angular 2",
                            "description": "Start learning the new version of Angular!",
                            "important": false,
                            "dueDate": "2016-11-30T20:30:00.000Z",
                            "done": false,
                            "doneDate": null
                        },
                        {
                            "title": "Study for exam",
                            "description": "Study for physics exam.",
                            "important": true,
                            "dueDate": "2016-08-14T15:30:00.000Z",
                            "done": false,
                            "doneDate": null
                        }
                    ]
                },
                {
                    name: '2017',
                    tasks: []
                }
            ]
        },
        {
            name: 'Teamwork',
            hasSubCat: null
        }
    ];


    if (localStorage.categories) {
        $rootScope.categories = JSON.parse(localStorage.getItem("categories"));
        // console.log("Data Loaded!");
    }

    $rootScope.importantTaskAvailable = false;

    $rootScope.refreshDoneTasks = function () {

        $rootScope.doneTasks = [];

        var cat;
        var subCat;
        var task;
        var taskIndex = -1;

        for (var catIndex = 0; catIndex < $rootScope.categories.length; catIndex++) {
            cat = $rootScope.categories[catIndex];
            if (cat.hasSubCat == true) {
                for (var subCatIndex = 0; subCatIndex < cat.subCategories.length; subCatIndex++) {
                    subCat = cat.subCategories[subCatIndex];
                    for (taskIndex = 0; taskIndex < subCat.tasks.length; taskIndex++) {
                        task = subCat.tasks[taskIndex];
                        if (task.done == true) {
                            task.catIndex = catIndex;
                            task.subCatIndex = subCatIndex;
                            task.taskIndex = taskIndex;
                            $rootScope.doneTasks.push(task);
                        }
                        if (task.important == true && $rootScope.importantTaskAvailable == false) {
                            $rootScope.importantTaskAvailable = true;
                        }
                    }
                }
            }
            else if (cat.hasSubCat == false) {
                for (taskIndex = 0; taskIndex < cat.tasks.length; taskIndex++) {
                    task = cat.tasks[taskIndex];
                    if (task.done == true) {
                        task.catIndex = catIndex;
                        task.subCatIndex = -1;
                        task.taskIndex = taskIndex;
                        $rootScope.doneTasks.push(task);
                    }
                    if (task.important == true && $rootScope.importantTaskAvailable == false) {
                        $rootScope.importantTaskAvailable = true;
                    }
                }
            }
        }
        $rootScope.importantTaskAvailable = false;
    };

    $rootScope.refreshDoneTasks();

    $rootScope.$watch('importantTaskAvailable', function () {
        $rootScope.showImportantAlert = true;
        $timeout(function () {
            $rootScope.fadeOut = true;
        }, 5000);
        $timeout(function () {
            $rootScope.showImportantAlert = false;
            $rootScope.fadeOut = false;
        }, 6000);
    });

    $rootScope.$watch('categories', function () {
        localStorage.setItem("categories", JSON.stringify($rootScope.categories));
        // console.log("Data Saved!");
    }, true);
}]);
