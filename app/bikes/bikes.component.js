/**
 * Bikes component used to display the list of bikes.
 *
 * @author Joshua Small <joshuahugh94@gmail.com>
 * @version 0.1
 */
angular.
    module('bikesApp', ['ngCookies', 'ngDialog']).
    component('bikes', {
    templateUrl: 'bikes/bikes.template.html',
    controller: ['$scope', '$http', '$cookies', 'ngDialog',
        function PhoneListController($scope, $http, $cookies, ngDialog) {
        var self = this;

        // Load in the bikes
        $http.get('//raw.githubusercontent.com/jujhars13/jujhars13/master/bikes.json').then(function(response) {
            var data = response.data.items;

            self.bikes = [];
            self.classes = [];
            self.showAll = true;

            // Get the different classes
            for (var i = 0; i < data.length; i++) {

                var bike = data[i];
                var classes = bike['class'];
                var cookie = $cookies.getObject('filters');

                bike['class'] = [];

                // Add any new classes
                for (var j = 0; j < classes.length; j++) {
                    var canAdd = true;

                    // Make the class name have the first letter uppercase
                    var formattedClass = self.firstCharUpper(classes[j]);

                    // Check the current classes
                    for (var k = 0; k < self.classes.length; k++) {
                        if (self.classes[k]['name'] == formattedClass) {
                            canAdd = false;
                            break;
                        }
                    }

                    if (canAdd) {

                        // Was this filter checked last time?
                        var checked = typeof cookie !== 'undefined' && cookie.indexOf(formattedClass) != -1;

                        if (checked)
                            self.showAll = false;

                        self.classes.push({
                            'name': formattedClass,
                            'checked': checked,
                        });
                    }

                    bike['class'].push(formattedClass);
                }

                self.bikes.push(bike);
            }


            /**
             * Changing the filters.
             */
            self.filterChange = function() {
                var showAll = true;
                var cookie = [];

                for (var i = 0; i < self.classes.length; i++) {
                    if (self.classes[i]['checked']) {
                        showAll = false;
                        // Add this class to the cookie so that its checked on load
                        cookie.push(self.classes[i]['name']);
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

        /**
         * Create a bike popup showing off one bike.
         *
         * @param bike The bike to show.
         */
        self.bikePopup = function (bike) {

            $scope.currentBike = bike;

            ngDialog.open({
                template: 'bikes/bikes-popup.template.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                width: "80%",
            });
        };

        /**
         * Make the first letter of a string uppercase and the rest lowercase.
         *
         * @param input The input to modify.
         *
         * @return The modified input.
         */
        self.firstCharUpper = function(input) {

            input = input.toLowerCase();

            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    }]
    });
