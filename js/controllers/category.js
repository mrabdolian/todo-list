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
            name: 'category1',
            subCategories: [
                {
                    name: 'subCategory1',
                    tasks: [
                        {
                            title: 'taskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitletaskTitle',
                            dueDate: '1234',
                            done: true,
                            doneDate: '1395/05/22 22:50 PM'
                        },
                        {
                            title: 'taskTitle2',
                            dueDate: '1235',
                            done: false,
                            doneDate: '1395/05/22'
                        }
                    ]
                },
                {
                    name: 'subCategory2',
                    tasks: [
                        {
                            title: 'task111',
                            dueDate: '222',
                            done: false,
                            doneDate: '1395/05/22'
                        },
                        {
                            title: 'task222',
                            dueDate: '333',
                            done: true,
                            doneDate: '1395/05/22'
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
                            done: false,
                            doneDate: '1395/05/22'
                        },
                        {
                            title: 'C2-taskTitle2',
                            dueDate: '1235',
                            done: false,
                            doneDate: '1395/05/22'
                        }
                    ]
                },
                {
                    name: 'C2-subCategory2',
                    tasks: [
                        {
                            title: 'C2-task111',
                            dueDate: '222',
                            done: false,
                            doneDate: '1395/05/22'
                        },
                        {
                            title: 'C2-task222',
                            dueDate: '333',
                            done: true,
                            doneDate: '1395/05/22'
                        }
                    ]
                },
                {
                    name: 'C2-subCategory3',
                    tasks: [
                        {
                            title: 'C2-taskTitle333',
                            dueDate: '1234',
                            done: true,
                            doneDate: '1395/05/22'
                        },
                        {
                            title: 'C2-taskTitle2',
                            dueDate: '1235',
                            done: false,
                            doneDate: '1395/05/22'
                        }
                    ]
                },
                {
                    name: 'C2-subCategory4',
                    tasks: [
                        {
                            title: 'C2-task444',
                            dueDate: '222',
                            done: true,
                            doneDate: '1395/05/22'
                        },
                        {
                            title: 'C2-task222',
                            dueDate: '333',
                            done: false,
                            doneDate: '1395/05/22'
                        }
                    ]
                }
            ]
        }
    ];


}]);