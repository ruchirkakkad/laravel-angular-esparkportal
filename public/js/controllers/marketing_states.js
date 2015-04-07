/**
 * Created by ruchir on 4/7/2015.
 */

app.controller('MarketingStatesController', ['$scope', '$http', '$state', 'Flash', '$stateParams', '$rootScope',
    function ($scope, $http, $state, Flash, $stateParams, $rootScope) {

        $scope.data = {
            'marketing_states_name': '',
            'marketing_states_id': '',
            'marketing_countries_id': '',
            'timezones_id': null
        };

        $scope.resetData = function() {
            $scope.data = {
                'marketing_states_name': '',
                'marketing_states_id': '',
                'marketing_countries_id': '',
                'timezones_id': null
            };

            $http.post('marketing_states/countries-timezones-add', {}).success(function (data) {
                    $scope.data.countries = data.countries;
                    $scope.data.timezones = data.timezones;
            }, function (x) {
                Flash.create('danger', 'Server Error');
            });


        };

        $scope.create = function () {

            $http.post('marketing_states/store-add', {
                marketing_states_name: $scope.data.marketing_states_name,
                marketing_countries_id: $scope.data.marketing_countries_id,
                timezones_id: $scope.data.timezones_id
            }).success(function (data) {

                var data = (data);

                if (data.code == '200') {

                    Flash.create('success', data.msg);
                    $state.go('app.marketing_states.index');
                }
                if (data.code == '403') {
                    Flash.create('danger', data.msg);
                }
            }, function (x) {
                Flash.create('danger', 'Server Error');
            });
        };


        $scope.editData = function () {


            $http.post('marketing_states/countries-timezones-add', {}).success(function (data) {
                $scope.data.countries = data.countries;
                $scope.data.timezones = data.timezones;
                $http.post('marketing_states/find-edit/' + $stateParams.id, {})
                    .success(function (data) {
                        $scope.data.marketing_states_name = data.marketing_states_name;
                        $scope.data.marketing_states_id = data.marketing_states_id;
                        $scope.data.marketing_countries_id = data.marketing_countries_id;
                        $scope.data.timezones_id = data.timezones_id;
                    });
            }, function (x) {
                Flash.create('danger', 'Server Error');
            });


        }


        $scope.update = function () {


            $http.post('marketing_states/update-edit/' + $scope.data.marketing_states_id, {
                marketing_states_name: $scope.data.marketing_states_name,
                marketing_countries_id: $scope.data.marketing_countries_id,
                timezones_id: $scope.data.timezones_id
            }).success(function (data) {

                var data = (data);

                if (data.code == '200') {

                    Flash.create('success', data.msg);
                    $state.go('app.marketing_states.index');
                }
                if (data.code == '403') {
                    Flash.create('danger', data.msg);
                }
            }, function (x) {
                Flash.create('danger', 'Server Error');
            });
        };

    }]);
