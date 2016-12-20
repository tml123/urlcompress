/**
 * Created by timdora on 12/18/16.
 */
angular.module('urls').controller("MapController", [ '$scope',
    function($scope){
        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });

}]);
