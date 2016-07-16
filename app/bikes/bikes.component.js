/**
 * Bikes component used to display the list of bikes.
 *
 * @author Joshua Small <joshuahugh94@gmail.com>
 * @version 0.1
 */
angular.
    module('bikesApp').
    component('bikes', {
    templateUrl: 'bikes/bikes.template.html',
    controller: ['$http',
        function PhoneListController($http) {
        var self = this;

        // Load in the bikes
        $http.get('//raw.githubusercontent.com/jujhars13/jujhars13/master/bikes.json').then(function(response) {
            self.bikes = response.data.items;
        });
    }]
    });
