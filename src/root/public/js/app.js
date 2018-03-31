angular.module('UncleApp', ['ngRoute','luegg.directives'])
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
            $scope.showGlitch();
            UncleFactory.sendMessage($scope.message.text).then(function(resp){
                // console.log('received', resp);
                $scope.showGlitch();
                $scope.message.response = resp.data;
                $scope.past_messages.push($scope.message);
                $scope.message = {
                    text: ' ',
                    response: ''
                };
                $scope.glue = true;
                // $scope.focus();
                // $location.hash('input')
                // $anchorScroll()
                // $timeout(function() {
                //   var scroller = angular.element("#main");
                //   console.log('scroller', scroller.scrollTop(), scroller[0].scrollHeight);
                //   scroller.scrollTop = scroller[0].scrollHeight;
                //   // scroller.scrollTop(scroller[0].scrollHeight)
                // });
            }, function(err){
                console.log('err', err);
            });
        }

    };
})
