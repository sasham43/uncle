angular.module('UncleApp', ['ngRoute'])
.factory('UncleFactory', function($http){
    return {
        sendMessage: function(message){
            return $http.get('/assistant/message/' + message)
        }
    }
})
.controller('UncleController', function($scope, UncleFactory){
    console.log('uncle loaded.');
    $scope.message = {
        text: '',
        response: ''
    };
    $scope.past_messages = [];

    $scope.listenKey = function(evt){
        console.log('keypress', evt.keyCode);
        if(evt.keyCode == 13){
            $scope.sendMessage();
        }
    };

    $scope.sendMessage = function(){
        UncleFactory.sendMessage($scope.message.text).then(function(resp){
            $scope.message.resp = resp;
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
