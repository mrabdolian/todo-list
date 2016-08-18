app.controller('CategoryCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

    $rootScope.activeState = null;

    // the function to focus on an element using jQuery
    $rootScope.focusOn = function (element) {
        $(element).focus();
    };

    // the function to check whether menu item is active or not (item for categories is catId)
    $rootScope.isActive = function (item) {
        return item == $rootScope.activeState;
    };

    $scope.addCategory = function () {
        $rootScope.categories.push({
            name: $scope.newCategory,
            hasSubCat: null
        });
        $scope.newCategory = '';
    };

    $scope.countItems = function (itemsParent) {
        if(itemsParent.hasSubCat) {
            return itemsParent.subCategories.length;
        }
        else if (itemsParent.tasks) {
            return itemsParent.tasks.length;
        }
        return null;
    };

}]);