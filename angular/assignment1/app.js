(function(){
	'use strict';

	angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.dishes = '';
		$scope.message = '';
		$scope.feedback = 'unknown';

		$scope.updateMessage = function() 
		{
			var message = 'Please enter data first';
			var feedback = 'bad';

			if ($scope.dishes) {
				var notEmpty = function(v) { return v && v.replace(/ /g,'').length};
				var count = $scope.dishes.split(',').filter(notEmpty).length;
				// console.log(message, count)

				if (count <= 3) {
					message = 'Enjoy!';
				} else {
					message = 'Too much!';
				}

				feedback = 'good';
			}

			$scope.message = message;
			$scope.feedback = feedback;
		}

	}
})()