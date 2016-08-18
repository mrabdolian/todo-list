var app = angular.module('todoListApp', ['ui.router', 'ui.bootstrap']);

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
            url: '/sub/:catId/:subId',
            templateUrl: 'views/delete.html',
            controller: 'DeleteSubCatCtrl'
        })
} ]);

app.controller('MainCtrl', ['$rootScope', function ($rootScope) {

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
        console.log("Data Loaded!");
    }

    $rootScope.$watchCollection('categories', function () {
        localStorage.setItem("categories", JSON.stringify($rootScope.categories));
        console.log("Data Saved!");
    });


}]);
