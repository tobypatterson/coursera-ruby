(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;

  tobuy.items = ShoppingListCheckOffService.getItemsToBuy();

  tobuy.addItem = function (itemIndex) {
    
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getItemsBought();

  bought.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.unBuyItem(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  var buy = [{
    name: 'Bags of Cookies',
    quantity: 3
  }, {
    name: 'Bags of Chips',
    quantity: 4
  }, {
    name: 'Sugary Drinks',
    quantity: 2
  }, {
    name: 'Pepto Bismol',
    quantity: 10
  }];

  var bought = [];

  service.buyItem = function (itemIndex) {
    
    var item = buy.splice(itemIndex, 1);
    
    bought.push(item.pop())
  };

  service.unBuyItem = function (itemIndex) {
    var item = bought.splice(itemIndex, 1);
    console.log(itemIndex, item)
    buy.push(item.pop())
  };

  service.getItemsToBuy = function () {
    return buy;
  };

  service.getItemsBought = function () {
    return bought;
  };
}

})();
