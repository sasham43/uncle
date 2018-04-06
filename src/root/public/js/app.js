angular.module('UncleApp', ['ngRoute'])
.factory('UncleFactory', function($http){
    return {
        sendMessage: function(message){
            return $http.get('/assistant/message/' + message)
        }
    }
})
.controller('UncleController', function($scope, $interval, $timeout, $anchorScroll, $location, UncleFactory){
    console.log('uncle loaded.');
    $scope.message = {
        text: '',
        response: ''
    };
    $scope.past_messages = [];
    $scope.show_loader = false;
    $scope.show_glitch = false;
    // $scope.show_loader = true;

    $scope.input = angular.element('#input');
    $scope.input.focus();
    var cursor_blink = $interval(function () {
        $scope.hide_cursor = !$scope.hide_cursor;
      }, 500);

    $scope.focus = function(){
        // console.log('focusing', $scope.input);
        $scope.input.focus();
    };

    $scope.listenKey = function(evt){
        // console.log('keypress', evt.keyCode);
        if(evt.keyCode == 13){
            $scope.sendMessage();
        }
    };

    $scope.showGlitch = function(){
        $scope.show_glitch = true;
        $timeout(function(){
            $scope.show_glitch = false;
        }, 500);
    };

    $scope.sendMessage = function(){
        if($scope.message.text.toLowerCase() == "load gif") {
            $scope.show_loader = true;
            $scope.message = {
                text: '',
                response: ''
            };
            $timeout(function(){
                $scope.show_loader = false;
            }, 5000)
        } else {
            // $scope.showGlitch();
            UncleFactory.sendMessage($scope.message.text).then(function(resp){
                // console.log('received', resp);
                // $scope.showGlitch();
                // $scope.message.response = resp.data;
                // $scope.past_messages.push($scope.message);
                // $scope.message = {
                //     text: ' ',
                //     response: ''
                // };
                $scope.processResponse($scope.message.text, resp.data);
            }, function(err){
                console.log('err', err);
            });
        }
    };

    $scope.processResponse = function(text, response){
        $scope.last_message = {
            text: text,
            response: ''
        };

        console.log('response', response);

        console.log('53', response.charAt(53));
        console.log('22', response.charAt(22))

        var count = 0;
        var wait_count = 0;
        for (var i = 0; i < response.length; i++) {
            wait_count += 100;
            $timeout(function(){
                var char = response.charAt(count);
                // console.log('char', i);
                $scope.last_message.response += char;
                count++;
            }, wait_count)
        }

        // $scope.message = {
        //     text: '',
        //     response: ''
        // };
    };
})
