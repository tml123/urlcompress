/**
 * Created by timdora on 12/15/16.
 */
angular.module('urls').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/urls/create', {
            templateUrl: 'urls/views/create-url.client.view.html'
        });
        $routeProvider.when('/urls/:shortUrl', {
            templateUrl: 'urls/views/view-url.client.view.html'
        });
        $routeProvider.when('/urls', {
            templateUrl: 'urls/views/list-urls.client.view.html'
        });
    }
]);
