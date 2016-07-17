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

            self.bikes = [];
            self.classes = [];

            // Get the different classes
            for (var i = 0; i < data.length; i++) {

                // Urls are currently serivng a 403 so use this for now
                data[i].image.thumb = 'bikes/bike.png';

                self.bikes.push(data[i]);

                var classes = data[i].class;

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
                        self.classes.push({
                            'name': classes[j],
                            'checked' : false,
                        });
                    }
                }
            }

            self.showAll = true;

            /**
             * Changing the filters.
             */
            self.filterChange = function() {

                for (var i = 0; i < self.classes.length; i++) {
                    if (self.classes[i].checked) {
                        self.showAll = false;
                        return;
                    }
                }

                self.showAll = true;
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
