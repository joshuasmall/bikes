/**
 * Bikes component used to display the list of bikes.
 *
 * @author Joshua Small <joshuahugh94@gmail.com>
 * @version 0.1
 */
angular.
    module('bikesApp', ['ngCookies']).
    component('bikes', {
    templateUrl: 'bikes/bikes.template.html',
    controller: ['$http', '$cookies',
        function PhoneListController($http, $cookies) {
        var self = this;

        // Load in the bikes
        $http.get('//raw.githubusercontent.com/jujhars13/jujhars13/master/bikes.json').then(function(response) {
            var data = response.data.items;

            self.bikes = [];
            self.classes = [];
            self.showAll = true;

            // Get the different classes
            for (var i = 0; i < data.length; i++) {

                // Urls are currently serivng a 403 so use this for now
                data[i].image.thumb = 'bikes/bike.png';

                self.bikes.push(data[i]);

                var classes = data[i].class;

                var cookie = $cookies.getObject('filters');

                // Add any new classes
                for (var j = 0; j < classes.length; j++) {
                    var canAdd = true;

                    // Check the current classes
                    for (var k = 0; k < self.classes.length; k++) {
                        if (self.classes[k].name == classes[j]) {
                            canAdd = false;
                            break;
                        }
                    }

                    if (canAdd) {

                        // Was this filter checked last time?
                        var checked = typeof cookie !== 'undefined' && cookie.indexOf(classes[j]) != -1;

                        if (checked)
                            self.showAll = false;

                        self.classes.push({
                            'name': classes[j],
                            'checked': checked,
                        });
                    }
                }
            }

            /**
             * Changing the filters.
             */
            self.filterChange = function() {
                var showAll = true;
                var cookie = [];

                for (var i = 0; i < self.classes.length; i++) {
                    if (self.classes[i].checked) {
                        showAll = false;
                        // Add this class to the cookie so that its checked on load
                        cookie.push(self.classes[i].name);
                    }
                }

                $cookies.putObject('filters', cookie);
                self.showAll = showAll;
            };

            /**
             * Filter the shown bikes.
             *
             * @param bike The bike to filter.
             *
             * @return boolean If this bike is included in the filtered results.
             */
            self.filterBikes = function(bike) {

                if (self.showAll)
                    return true;

                var select = false;

                for (var i = 0; i < self.classes.length; i++) {
                    var bikeClass = self.classes[i];
                    // This filter is relevant
                    if (bikeClass.checked) {
                        if (bike.class.indexOf(bikeClass.name) == -1)
                            return false;
                        else
                            select = true;
                    }
                }

                return select;
            };
        });
    }]
    });
