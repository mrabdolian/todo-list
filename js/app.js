var app = angular.module('todoListApp', ['ui.router']);

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
} ]);

app.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.categories = ['category1', 'category2', 'category3']

}]);
