angular.module('UncleApp', ['ngRoute'])
.factory('UncleFactory', function($http){
    return {
        sendMessage: function(message){
            return $http.get('/assistant/message/' + message)
        }
    }
})
.controller('UncleController', function($scope, $interval, UncleFactory){
    console.log('uncle loaded.');
    $scope.message = {
        text: '',
        response: ''
    };
    $scope.past_messages = [];

    $scope.input = angular.element('#input');
    $scope.input.focus();
    var cursor_blink = $interval(function () {
        $scope.hide_cursor = !$scope.hide_cursor;
      }, 500);

    $scope.focus = function(){
        console.log('focusing', $scope.input);
        $scope.input.focus();
    };

    $scope.listenKey = function(evt){
        // console.log('keypress', evt.keyCode);
        if(evt.keyCode == 13){
            $scope.sendMessage();
        }
    };

    $scope.sendMessage = function(){
        UncleFactory.sendMessage($scope.message.text).then(function(resp){
            console.log('received', resp);
            $scope.message.response = resp.data;
            $scope.past_messages.push($scope.message);
            $scope.message = {
                text: '',
                response: ''
            };
        }, function(err){
            console.log('err', err);
        });
    };
})
