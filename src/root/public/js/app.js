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

    $scope.showGif = function(){
        $scope.show_loader = true;
        $scope.message = {
            text: '',
            response: ''
        };
        $timeout(function(){
            $scope.show_loader = false;
        }, 5000)
    };


    $scope.commands = [
        {
            text: 'load gif',
            response: $scope.showGif
        },
        {
            text: 'who are you?',
            response: 'I am U.N.C.L.E., an intelligent cyber presence designed to give you information.'
        },
        {
            text: 'what do you do?',
            response: 'I give you information.'
        },
        {
            text: 'what does uncle stand for?',
            response: 'U.N.C.L.E. stands for Unified Nexus Command Line Executor.'
        },
        {
            text: 'who created you?',
            response: 'I was created by Dr. Simon Brogueman who wanted to live forever and attempted to implant his consciousness into silicon.'
        }
    ];


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
        var command = $scope.commands.find(function(cmd){
            if($scope.message.text.toLowerCase() == cmd.text){
                return true;
            }
        });

        if(command){
            console.log('type of ', typeof command.response);
            if(typeof command.response == 'function') {
                command.response();
            } else {
                $scope.processResponse($scope.message.text, command.response);
            }
        } else if($scope.message.text.toLowerCase() == "load gif") {
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

    $scope.playAudio = function(){
        $scope.audio = new Audio('audio/keys.mp3');
        $scope.audio.loop = true;
        $scope.audio.play();
        console.log('audio', $scope.audio)
    };

    $scope.stopAudio = function(){
        console.log('trying to stop');
        // $scope.audio.stop();
        $scope.audio.pause();
        $scope.audio.currentTime = 0;
    };

    $scope.processResponse = function(text, response){
        $scope.playAudio();
        $scope.last_message = {
            text: text.toUpperCase(),
            response: ''
        };

        var count = 0;
        var wait_count = 0;
        for (var i = 0; i < response.length; i++) {
            wait_count += 50;
            $timeout(function(){
                var char = response.charAt(count);
                $scope.last_message.response += char;
                count++;
                window.scrollTo(0,document.body.scrollHeight);
                if(count == response.length){
                    $scope.stopAudio();
                    $scope.past_messages.push($scope.last_message);
                }
            }, wait_count)
        }

        $scope.message = {
            text: '',
            response: ''
        };
    };
})
