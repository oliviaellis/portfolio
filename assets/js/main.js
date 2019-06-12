const injectWeather = (weather) => {
  let holder = document.getElementById('body');
  let rain_div = document.createElement('div');
  let weather_display = document.getElementById('weather');
  rain_div.className = "rain front-row";
  switch (weather) {
    case "Clear":
      console.log("It's sunny");
      holder.className = "clear";
      weather_display.innerHTML = "It's a sunny day in the city. Don't forget the sunscreen!";
      break;
    case "Rain"||"Drizzle":
      console.log("It's rainy");
      holder.appendChild(rain_div);
      weather_display.innerHTML = "It's raining in New York. Makes me want to stay home and play video games.";
      makeItRain();
      break;
    case "Clouds":
      console.log("It's cloudy");
      holder.className = "clouds";
      weather_display.innerHTML = "It's cloudy today in the city. Clouds provide nice, even lighting for me to photograph my friends in!";
      break;
    case "Thunderstorm":
      console.log("Storms a-brewin'.");
      holder.appendChild(rain_div);
      weather_display.innerHTML = "There's a storm a-brewin' in New York. I adore thunderstorms; I like watching for lightning.";
      makeItRain();
      break;
    case "Snow":
      console.log("It's snowing!");
      weather_display.innerHTML = "It's snowing here. Do you want to build a snowman?";
      break;
    default:
      console.log(weather);
      console.log("I'm not sure what the weather is like right now.");
      break;
  }

}

const getWeather = () => {
  let request = new XMLHttpRequest();

  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=5128638&APPID=e6976814f3a4a6105cf0ab815e4e7f9e', true)
  request.onload = function() {
    let data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      let weather = data.weather[0].main;
      // console.log(weather);
      injectWeather(weather);
    }
  }

  request.send();

}

window.onload = getWeather();


const makeItRain = function() {
  //clear out everything
  $('.rain').empty();

  let increment = 0;
  let drops = "";
  let backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  $('.rain.front-row').append(drops);
  $('.rain.back-row').append(backDrops);
}
