app.controller('SubCategoryCtrl', ['$rootScope', '$scope', '$stateParams', '$state', '$location',
    function ($rootScope, $scope, $stateParams, $state, $location) {

        // set activeState to catId
        $rootScope.activeState = $stateParams.categoryId;

        // set a new variable to get category model from root scope
        $rootScope.category = $rootScope.categories[$stateParams.categoryId];

        // the function for checking if the state is changed to hide subcategory and show tasks
        $scope.stateIs = function (state) {
            return $state.is(state);
        };

        $scope.sortableOptions = {
            'ui-floating': true,
            stop: function (e, ui) {
                $rootScope.refreshDoneTasks();
            }
        };

        // the function to redirect to tasks-list (when there is no subCategories)
        var noSubRedirect = function () {
            $location.path('/category/' + $stateParams.categoryId + '/sub/-1');
        };

        // call redirect function if there is no subCategories (hasSubCat == false)
        if ($rootScope.category.hasSubCat === false) {
            noSubRedirect();
        }

        $scope.chooseSubCat = function () {
            $rootScope.category.hasSubCat = true;
            $rootScope.category.subCategories = [];
        };

        $scope.chooseTask = function () {
            $rootScope.category.hasSubCat = false;
            $rootScope.category.tasks = [];
            noSubRedirect();
        };

        $scope.addSubCategory = function () {
            $rootScope.category.subCategories.push({
                name: $scope.newSubCategory,
                tasks: []
            });
            $scope.newSubCategory = '';
        };

    }]);
