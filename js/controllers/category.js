app.controller('CategoryCtrl', ['$scope', function ($scope) {

    $scope.addCategory = function () {
        $scope.categories.push({
            name: $scope.newCategory,
            subCategories: []
        });
        $scope.newCategory = '';
    };

    $scope.categories = [
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
                    name: '2017'
                }
            ]
        },
        {
            name: 'Teamwork'
        }
    ];


}]);