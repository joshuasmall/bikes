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
            var data = response.data.items;

            self.bikeRows = [];

            var bikeRowIndex = 0;
            var cols = 4;

            // Group the bikes into rows
            for (var i = 0; i < data.length; i++) {
                if (i % cols == 0 && i != 0)
                    bikeRowIndex++;

                // Create the array to hold the bikes in this row
                if (typeof self.bikeRows[bikeRowIndex] === 'undefined')
                    self.bikeRows[bikeRowIndex] = [];

                // Urls are currently serivng a 403 so use this for now
                data[i].image.thumb = 'bikes/bike.png';

                self.bikeRows[bikeRowIndex].push(data[i]);
            }
        });
    }]
    });
