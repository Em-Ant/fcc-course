$(document).ready(function(){
  
  // select the background only one time
  var firstQuery = true;
  
  var queryOptions = {
    units: 'metric',
    position : ''
  }
 
  var getPosition = function (options) {
    return $.get("http://ip-api.com/json", function (response) {
      queryOptions.position = {
        lat : response.lat,
        lon : response.lon,
        city : response.city,
        countryCode : response.countryCode
      }; 
    }); 
  };

  var getWeather = function() {      
    var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
    var queryUrl = baseUrl + 'units=' + queryOptions.units + '&q=' +
 queryOptions.position.city + ',' + queryOptions.position.countryCode;
    return $.getJSON(queryUrl);
  }

  
  var displayData = function(data){
    if(queryOptions.units === 'imperial'){
      var temp_units = 'wi wi-fahrenheit';
      var speed_units = ' MPH ';
    }
    else{
      temp_units = 'wi wi-celsius';
      speed_units = ' m/s ';
    }
    $('.weather .wrap').remove();
    var $wrap = $('<div>').addClass('wrap text-center');
    $wrap.append($('<h2>').text(data.name+', '+data.sys.country));
    var $main = $('<h1>').append($('<i>').addClass(selectMainIcon(data.weather[0].icon)));
    $main.append(' ');
    $main.append($('<i>').addClass('wi wi-thermometer'));
    $main.append(' ' + Math.round(data.main.temp * 2)/2);
    $main.append($('<i>').addClass(temp_units));
    $wrap.append($main);
    $wrap.append($('<h5>').text('CURRENTLY: '+ data.weather[0].description.toUpperCase()));
    $wrap.append($('<h5>').text('HUMIDITY : '+ data.main.humidity + ' %'));
    var $wind = $('<h5>').append('WIND     : '+selectWindDir(data.wind.deg) + ' - '+data.wind.speed + speed_units);
    $wrap.append($wind);
    $('.weather').prepend($wrap);
    $('.weather').fadeIn();;
    
    // if it's the startUp query select the appropriate BG
    if(firstQuery){
      if(data.main.temp > 27)
        $('body').css('background-image','url("./img/desert.jpg")');
      else if (data.main.temp > 17)
        $('body').css('background-image','url("./img/fair.jpg")');
      else if (data.main.temp > 7)
        $('body').css('background-image','url("./img/foggy.jpg")');
      else
        $('body').css('background-image','url("./img/cold.jpg")');
      firstQuery = false;
    }    
    $('body').css('background-size','cover')
  };
  
  var selectWindDir= function(deg){
    var normDeg = parseInt(Math.round(deg/22.5));
    var out = ['N','N,NE','NE','E,NE','E','E,SE','SE','S,SE','S','S,SW','SW','W,SW','W','W,NW','NW','N,NW','N'];
    return out[normDeg];
  }
  
  var selectMainIcon = function(icon){
    switch(icon){
        // day
      case '01d':
        return 'wi wi-day-sunny';
      case '02d':
        return 'wi wi-day-sunny-overcast';
      case '03d':
        return 'wi wi-day-cloudy';
      case '04d':
        return 'wi wi-cloudy';
      case '09d':
        return 'wi wi-day-showers';
      case '10d':
        return 'wi wi-day-rain';
      case '11d':
        return 'wi wi-day-thunderstorm';
      case '13d':
        return 'wi wi-day-snow';
      case '50d':
        return 'wi wi-day-fog';
        // night
      case '01n':
        return 'wi wi-night-clear';
      case '02n':
        return 'wi wi-night-cloudy';
      case '03n':
        return 'wi wi-night-cloudy';
      case '04n':
        return 'wi wi-cloudy';
      case '09n':
        return 'wi wi-night-showers';
      case '10n':
        return 'wi wi-night-rain';
      case '11n':
        return 'wi wi-night-thunderstorm';
      case '13n':
        return 'wi wi-night-snow';
      case '50n':
        return 'wi wi-night-fog';
    default:
      return 'wi wi-alien';
  }
}
  
  /* toggle units and perform a new query for weather
  I could have written a func to convert values, 
  but this is easier, even if there could be differences in
  the data reported */
  $('#push').click(function(){  
    if(queryOptions.units === 'imperial')
      queryOptions.units = 'metric';
    else
      queryOptions.units = 'imperial';
    getWeather().then(displayData);
  });
  
  // startUp API queries
  getPosition().then(getWeather).then(displayData);
  
});




