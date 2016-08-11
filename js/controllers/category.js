app.controller('CategoryCtrl', ['$scope', function ($scope) {

    $scope.categories = [
        {
            name: 'category1',
            subCategories: [
                {
                    name: 'subCategory1',
                    tasks: [
                        {
                            title: 'taskTitle',
                            dueDate: '1234',
                            description: 'some description...'
                        },
                        {
                            title: 'taskTitle2',
                            dueDate: '1235',
                            description: 'some description.......'
                        }
                    ]
                },
                {
                    name: 'subCategory2',
                    tasks: [
                        {
                            title: 'task111',
                            dueDate: '222',
                            description: 'd...'
                        },
                        {
                            title: 'task222',
                            dueDate: '333',
                            description: 'd.......'
                        }
                    ]
                }
            ]
        },
        {
            name: 'category2',
            subCategories: [
                {
                    name: 'C2-subCategory1',
                    tasks: [
                        {
                            title: 'C2-taskTitle',
                            dueDate: '1234',
                            description: 'some description...'
                        },
                        {
                            title: 'C2-taskTitle2',
                            dueDate: '1235',
                            description: 'some description.......'
                        }
                    ]
                },
                {
                    name: 'C2-subCategory2',
                    tasks: [
                        {
                            title: 'C2-task111',
                            dueDate: '222',
                            description: 'd...'
                        },
                        {
                            title: 'C2-task222',
                            dueDate: '333',
                            description: 'd.......'
                        }
                    ]
                }
            ]
        }
    ];


}]);