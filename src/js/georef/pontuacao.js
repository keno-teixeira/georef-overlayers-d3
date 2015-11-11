angular.module("geoApp").directive("uiPontuacao", function ($filter) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			var _formatData = function (data) {
				data = data.replace(/[^0-9]+/g, "")
				if(data.length > 5) {
					data = data.substring(0,2) + "" + data.substring(2,5)
				}
				return data
			}

			element.bind("keyup", function () {
				ctrl.$setViewValue(_formatData(ctrl.$viewValue))
				ctrl.$render()
			})
		}
	}
})