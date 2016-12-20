/**
 * Created by timdora on 12/15/16.
 */
angular.module('urls').controller('UrlsController', ['$scope', '$routeParams', '$location', 'Urls',
    function($scope, $routeParams, $location, Urls){
    $scope.create = function() {
        var url = new Urls({
            url: this.url,
        });
        url.$save(function (response) {
            $scope.shortUrl = response.shortUrl;
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    $scope.find = function() {
        $scope.urls = Urls.query();
    };

    $scope.findOne = function () {
        $scope.url = Urls.get({
            shortUrl: $routeParams.shortUrl
        });
    };

    $scope.loadMore = function (){
        var q = Urls.query({limit: 10});
        for (var i = 0; i < q.length; i++) {
            $scope.urls.push(q[i]);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
}]);