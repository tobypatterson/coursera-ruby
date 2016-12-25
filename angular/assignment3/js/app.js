(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            link: MenuSearchtDirectiveLink
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.searchTerm = null;


        menu.loadMenuItems = function() {
            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (result) {
                menu.items = result;
            });
        }

        menu.removeItem = function(idx) {
            // console.log("Removing ", idx)
            menu.items.splice(idx, 1)
        }

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(response) {
                var foundItems = [];
                var menu_items = response.data ? response.data.menu_items : [];

                if (searchTerm && menu_items) foundItems = menu_items.filter(function(obj) {
                    return obj.name && obj.name.toLowerCase().includes(searchTerm.toLowerCase());
                })

                return foundItems;
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        };

    }

    function MenuSearchtDirectiveLink(scope, element) {

        scope.$watch('items', function (newValue, oldValue) {
            // console.log("Old value: ", oldValue);
            // console.log("New value: ", newValue);

            /*var loader = element.find("div");

            if (newValue && newValue.length) {
                loader.removeClass('loader');
            }
            else {
                loader.addClass('loader');
            }*/
        });

    }

})();
