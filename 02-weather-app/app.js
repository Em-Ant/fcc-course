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
      var tempUnits = 'wi wi-fahrenheit';
      var speedUnits = ' MPH ';
      var hue = 250 - Math.round((data.main.temp-32)*3.333);;
    }
    else{
      tempUnits = 'wi wi-celsius';
      speedUnits = ' m/s ';
      hue = 250 - Math.round(6*data.main.temp);
    }    
    
    if( Date.now() >= data.sys.sunrise*1000 && Date.now() <= data.sys.sunset*1000)
      var iconSwitch = '-day-';
    else
      iconSwitch = '-night-';
    
  var resetHue = function(x){
    x =  (x > 360) ? x -360 : x; 
    return (x < 0) ? x + 360 : x;  
  }
      
  $('.view').fadeOut(function(){
    $('#city').text(data.name+', '+data.sys.country);
    $('#w-icon').removeClass().addClass("wi wi-owm"+iconSwitch+data.weather[0].id);
    $('#D').text(data.weather[0].description);
    $('#T').text(Math.round(data.main.temp*2)/2);
    $("#T-units").removeClass().addClass(tempUnits);
    $("#P").text(data.main.pressure);
    $("#H").text(data.main.humidity);
    $("#W").text(Math.round(data.wind.speed*2)/2);
    $("#W-dir").removeClass().addClass('wi wi-wind towards-'+Math.round(data.wind.deg)+'-deg');
    $("#W-units").text(speedUnits);
    $('.view').css('background','linear-gradient(to bottom , hsl('+resetHue(hue)+',70%,20%), hsl('+resetHue(hue-60)+',80%,40%))');
    $('.view').fadeIn();
  });
    // if it's the startUp query select the appropriate BG
    if(firstQuery){
      if(data.main.temp > 30)
        $('body').css('background-image','url(./img/desert.jpg)');
      else if (data.main.temp > 20)
        $('body').css('background-image','url(./img/fair.jpg)');
      else if (data.main.temp > 10)
        $('body').css('background-image','url(./img/foggy.jpg)');
      else
        $('body').css('background-image','url(./img/cold.jpg)');
      $('.preloader').fadeOut();
      firstQuery = false;
    }    
    $('body').css('background-size','cover')
  };
  
  /* toggle units and perform a new query for weather
  I could have written a func to convert values, 
  but this is easier, even if there could be differences in
  the data reported */
  
  $('.screen, .push').click(function(){  
    if(queryOptions.units === 'imperial')
      queryOptions.units = 'metric';
    else
      queryOptions.units = 'imperial';
    getWeather().then(displayData);
  });
  
  // startUp API queries
  getPosition().then(getWeather).then(displayData);
  
});




