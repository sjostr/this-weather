import { Component, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ThisWeather';
  myValue = false;
  getLocalStorageValue = "";
  favoriteslistArray = [];
  favoriteIcon = 'fa-heart-o';

  // Do work on page load
  // Removed functionality here to get application to work.... 11/12/17
  ngAfterViewInit() {
    if(localStorage.getItem("favoriteCityArray") !== null){
      this.localStorageArray = JSON.parse(localStorage.getItem("favoriteCityArray"));
      if (this.localStorageArray.length > 0){
        this.getWeather(this.localStorageArray[0]);
        this.favoriteIcon = 'fa-heart';
      }
    } else {
      this.favoriteIcon = 'fa-heart-o';
    }
/*
    // if this localstorage key exists
    if (this.getLocalStorage("favoriteCityArray")){
      // get weather for the first item in this array
      var omg = this.getLocalStorage("favoriteCityArray");
      this.getWeather(omg[0]);
      
    } else {
      this.favoriteIcon = 'favorite_border';
    };
 */   
  }
  constructor(private http: Http) {}
  cityName = "";
  cityNameActual = "";
  cityTemperature = 0;
  cityTemperatureMin = 0;
  cityTemperatureMax = 0;        
  cityWeatherDescription = "";
  cityWeatherWindSpeed =  0;
  updatedfavoriteslistArray = [];
  localStorageArray = [];
  

  getWeather(searchForCity){
    //console.log("getWeather called with this value: " + searchForCity);
    if (!searchForCity) {
      return;
    }
    this.http.get('http://api.openweathermap.org/data/2.5/weather?APPID=' + environment.appID + '&units=imperial&q=' + searchForCity )
    .subscribe (
      (res: Response) => {
        const weatherCity = res.json();
        //console.log(weatherCity);
              
        this.cityNameActual = weatherCity.name;
        this.cityTemperature = Math.round(parseInt(weatherCity.main.temp));
        this.cityTemperatureMin = Math.round(parseInt(weatherCity.main.temp_min));
        this.cityTemperatureMax = Math.round(parseInt(weatherCity.main.temp_max));        
        this.cityWeatherDescription = weatherCity.weather[0].description;
        this.cityWeatherWindSpeed =  Math.round(parseInt(weatherCity.wind.speed));

        if(localStorage.getItem("favoriteCityArray") != null){
          this.localStorageArray = JSON.parse(localStorage.getItem("favoriteCityArray"));
          if(this.localStorageArray.indexOf(this.cityNameActual) == -1) {
            // console.log("this city IS NOT a favorite");
            this.favoriteIcon = 'fa-heart-o';
            // set fav icon to non-favorite
          } else {
            // console.log("this city IS a favorite");
            this.favoriteIcon = 'fa-heart';
            // set fav ison to favorite
          }
        }
      });

  }
  addOrRemoveFav(){
    // first we add the city to the array and save to local storage
    // 1. try to get localstorage
    if(localStorage.getItem("favoriteCityArray") === null){
      // if this local storage key doesn't exist, add the City to the array
      this.localStorageArray.push(this.cityNameActual);
      this.toggleIcon();
    } else {
      this.localStorageArray = JSON.parse(localStorage.getItem("favoriteCityArray"));
      if(this.localStorageArray.indexOf(this.cityNameActual) == -1) {
        // If this.cityNameActual isn't in the array, add it.
        this.localStorageArray.push(this.cityNameActual);
        this.toggleIcon();
      } else {
        // remove this city from favorites array.
        this.localStorageArray.splice(this.localStorageArray.indexOf(this.cityNameActual), 1);
        this.toggleIcon();
      }
    }
    // Save the array to localstorage
    localStorage.setItem("favoriteCityArray",JSON.stringify(this.localStorageArray));
  }


  saveLocalStorage(localStorageKey, localStorageVal){
    // push item on to array
    this.favoriteslistArray.push(localStorageVal);
    return localStorage.setItem(localStorageKey,  JSON.stringify(this.favoriteslistArray));
  }
  getLocalStorage(localStorageKey){
    return this.getLocalStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
  }
  toggleIcon(){
    // if item has icon, remove icon favorite_border vs favorite
    if (this.favoriteIcon == 'fa-heart-o') {
      return this.favoriteIcon = 'fa-heart';
    } else {
      return this.favoriteIcon = 'fa-heart-o';
    }
  }
  
}