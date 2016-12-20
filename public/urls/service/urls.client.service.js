/**
 * Created by timdora on 12/15/16.
 */
angular.module('urls').factory('Urls', ['$resource', function($resource){
    return $resource('/api/urls/:shortUrl', {
        'update': {method: 'PUT'},
        'get': {method: 'GET'},
        'query': {method: 'GET', isArray: true}
    });
}]);
