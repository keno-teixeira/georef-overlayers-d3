angular.module("geoApp").directive('pwCheck',function(){
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            var firstPoint = '#' + attrs.pwCheck
            $(element).add(firstPoint).on('keyup', function(){
                scope.$apply(function(){
                    var camp2 = parseInt(element.val())
                    var camp1 = parseInt($(firstPoint).val())
                    if(camp2 < camp1)
                        ctrl.$setValidity('ptmatch', false)
                    else
                        ctrl.$setValidity('ptmatch', true)
                })
            })
        }
    }
})