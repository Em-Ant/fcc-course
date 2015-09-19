/**
* -----------------------------------------------
*             SHOW THE LOCAL WEATHER v2
*              for freeCodeCamp.com
* -----------------------------------------------
*
* This is the 2nd version of the exercise,
* using AngularJS. It's my first Angular project.
*
* For this exercise I used :
* - Pure CSS3 design
* - AngularJS with $http for Ajax
* - OpenWeatherMap API
* - ip-api.com for geolocation
* - Google Fonts
* - Weather Icons from Erik Flowers
* - Font Awesome (the spinning preloader)
*
* A version using JQuery as JavaScript framework
* is available at
* ------------------------------------------------
* ====> http://codepen.io/Em-Ant/pen/yNGead
* ------------------------------------------------
*/

'use strict'

angular.module('weatherApp',['ngAnimate']);

// Custom Services
angular.module('weatherApp')
  .service('positionService',['$http',function($http){

    // Retrieve position by IP
    this.getPosition = function () {
      return $http({
        method: 'GET',
        url: 'http://ip-api.com/json'
      }).then( function(response) {
        var result = {};
        result.position = {
          lat : response.data.lat,
          lon : response.data.lon,
          city : response.data.city,
          countryCode : response.data.countryCode
        };
        return result;
      }, function(response) {
        var result;
        result.error = "positionService Error";
        return result;
      });
    };
  }]).service('weatherService',['$http',function($http){

  // Retrieve Weather from OWM
  this.getWeather = function(city, countryCode, units) {
    var location = city + ',' + countryCode;
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      params: {
        q: location,
        units: units
      }
    }).then(function($data) {

      // Calculate if night or day
      var time ;
      if( Date.now() >= $data.data.sys.sunrise*1000 && Date.now() <= $data.data.sys.sunset*1000)
        time = 'day';
      else
        time = 'night';

      return {
        weather: {
        temperature : $data.data.main.temp,
        pressure: $data.data.main.pressure,
        humidity: $data.data.main.humidity,

        windDir: $data.data.wind.deg,
        windSpeed: $data.data.wind.speed,
        description: $data.data.weather[0].description,
        },

        status: {
          time: time,
          id: $data.data.weather[0].id
        }
      };
    }, function($data) {
      return {
        error: "weatherService Error"
      };
    });
  }
}]);

// Custom round Filter for Pressure & Temp
angular.module('weatherApp')
  .filter('customRound', function(){
    return function(input, mode) {
      if( !isNaN(mode) && mode > 0) {
        return '' + Math.round(input*mode) / mode;
      } else {
        return '' + Math.round(input);
    }
  }
});

// Controller
angular.module('weatherApp')
  .controller('mainController',['$scope', 'positionService','weatherService', '$timeout',
      function($scope, positionService, weatherService, $timeout){

    $scope.ready = false;
    $scope.units = {
      base: 'metric',
      temp: 'celsius',
      speed: 'm/s'
    }

    $scope.toggleUnits = function() {
      if($scope.ready) {
        $scope.ready = false;
        $timeout(function(){
        if($scope.units.base === 'metric') {
           $scope.units = {
            base: 'imperial',
            temp: 'fahrenheit',
            speed: 'MPH'
          }

          $scope.weather.temperature = $scope.weather.temperature * 1.8 + 32.0;
          $scope.weather.windSpeed = $scope.weather.windSpeed / 0.44704;

        } else {
          $scope.units = {
            base: 'metric',
            temp: 'celsius',
            speed: 'm/s'
          }

          $scope.weather.temperature = ($scope.weather.temperature - 32.0) / 1.8;
          $scope.weather.windSpeed = $scope.weather.windSpeed * 0.44704;
        }

          $scope.ready = true;
        },500);
      }
    };

    // Calculate and set the Phone screen back-ground
    // It changes with temperature
    var setViewBg = function() {
      var resetHue = function(x){
        x =  (x > 360) ? x -360 : x;
        return (x < 0) ? x + 360 : x;
      };

    if(!isNaN($scope.weather.temperature)) {
        var hue = 250 - Math.round(6*$scope.weather.temperature);
        $scope.viewBg = 'linear-gradient(to bottom , hsl(' + resetHue(hue)+',70%,20%), hsl('+resetHue(hue+60) + ',80%,40%))';
      }
    };

    // Set the page background
    var setMainBg = function() {
    if(!isNaN($scope.weather.temperature)) {
        var mainBg;
         if($scope.weather.temperature > 30)
          mainBg = 'http://emant.altervista.org/ext/w_bg_4.jpg';
        else if ($scope.weather.temperature > 20)
          mainBg = 'http://emant.altervista.org/ext/w_bg_3.jpg';
        else if ($scope.weather.temperature > 10)
          mainBg = 'http://emant.altervista.org/ext/w_bg_2.jpg';
        else
          mainBg = 'http://emant.altervista.org/ext/w_bg_1.jpg';

        // JQlite selection
        angular.element(document.querySelector('body'))
          .css('background-image', 'url(' + mainBg + ')');
      }
    };

    var initializeData = function(){
      positionService.getPosition()
      .then(function(response) {
        return weatherService.getWeather(response.position.city,response.position.countryCode,'metric')
          .then(function(res){
            $scope.position = response.position;
            $scope.weather = res.weather;
            $scope.status = res.status;
          });
        }).then(function(){
          $scope.ready = true;
          $scope.preloaderDone = true;
          setViewBg();
          setMainBg();
        });
      };

   initializeData();

  /* TODO :
  * handle errors in promises chaining
  */

  }]);
