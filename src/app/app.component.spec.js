var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
System.register("environments/environment", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var environment;
    return {
        setters: [],
        execute: function () {// The file contents for the current environment will overwrite these during build.
            // The build system defaults to the dev environment which uses `environment.ts`, but if you do
            // `ng build --env=prod` then `environment.prod.ts` will be used instead.
            // The list of which env maps to which file can be found in `.angular-cli.json`.
            exports_1("environment", environment = {
                production: false,
                appID: "8181eee7ea7264547009dbcb349a22a4"
            });
        }
    };
});
System.register("app/app.component", ["@angular/core", "environments/environment"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, environment_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (environment_1_1) {
                environment_1 = environment_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.http = http;
                    this.title = 'ThisWeather';
                    this.myValue = false;
                    this.getLocalStorageValue = "";
                    this.favoriteslistArray = [];
                    this.favoriteIcon = 'favorite';
                    this.cityName = "";
                    this.cityNameActual = "";
                    this.cityTemperature = 0;
                    this.cityTemperatureMin = 0;
                    this.cityTemperatureMax = 0;
                    this.cityWeatherDescription = "";
                    this.cityWeatherWindSpeed = 0;
                    this.updatedfavoriteslistArray = [];
                    this.localStorageArray = [];
                }
                // Do work on page load
                // Removed functionality here to get application to work.... 11/12/17
                AppComponent.prototype.ngAfterViewInit = function () {
                    if (localStorage.getItem("favoriteCityArray") !== null) {
                        this.localStorageArray = JSON.parse(localStorage.getItem("favoriteCityArray"));
                        if (this.localStorageArray.length > 0) {
                            this.getWeather(this.localStorageArray[0]);
                            this.favoriteIcon = 'favorite';
                        }
                    }
                    else {
                        this.favoriteIcon = 'favorite_border';
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
                };
                AppComponent.prototype.getWeather = function (searchForCity) {
                    var _this = this;
                    console.log("getWeather called with this value: " + searchForCity);
                    this.http.get('http://api.openweathermap.org/data/2.5/weather?APPID=' + environment_1.environment.appID + '&units=imperial&q=' + searchForCity)
                        .subscribe(function (res) {
                        var weatherCity = res.json();
                        console.log(weatherCity);
                        _this.cityNameActual = weatherCity.name;
                        _this.cityTemperature = Math.round(parseInt(weatherCity.main.temp));
                        _this.cityTemperatureMin = Math.round(parseInt(weatherCity.main.temp_min));
                        _this.cityTemperatureMax = Math.round(parseInt(weatherCity.main.temp_max));
                        _this.cityWeatherDescription = weatherCity.weather[0].description;
                        _this.cityWeatherWindSpeed = Math.round(parseInt(weatherCity.wind.speed));
                    });
                };
                AppComponent.prototype.addOrRemoveFav = function () {
                    // first we add the city to the array and save to local storage
                    // 1. try to get localstorage
                    if (localStorage.getItem("favoriteCityArray") === null) {
                        // if this local storage key doesn't exist, add the City to the array
                        this.localStorageArray.push(this.cityNameActual);
                    }
                    else {
                        this.localStorageArray = JSON.parse(localStorage.getItem("favoriteCityArray"));
                        if (this.localStorageArray.indexOf(this.cityNameActual) == -1) {
                            // If this.cityNameActual isn't in the array, add it.
                            this.localStorageArray.push(this.cityNameActual);
                        }
                        else {
                            // remove this city from favorites array.
                            this.localStorageArray.splice(this.localStorageArray.indexOf(this.cityNameActual), 1);
                        }
                    }
                    // Save the array to localstorage
                    localStorage.setItem("favoriteCityArray", JSON.stringify(this.localStorageArray));
                };
                AppComponent.prototype.saveLocalStorage = function (localStorageKey, localStorageVal) {
                    console.log("saveLocalStorage called....");
                    // push item on to array
                    this.favoriteslistArray.push(localStorageVal);
                    return localStorage.setItem(localStorageKey, JSON.stringify(this.favoriteslistArray));
                };
                AppComponent.prototype.getLocalStorage = function (localStorageKey) {
                    console.log("getlocalstorage called...");
                    return this.getLocalStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
                };
                AppComponent.prototype.toggleIcon = function () {
                    // if item has icon, remove icon favorite_border vs favorite
                    if (this.favoriteIcon == 'favorite_border') {
                        this.addToFavorites(this.cityNameActual);
                        return this.favoriteIcon = 'favorite';
                    }
                    else {
                        this.removeFromFavorites(this.cityNameActual);
                        return this.favoriteIcon = 'favorite_border';
                    }
                };
                AppComponent.prototype.checkForFavorite = function (cityToCheck) {
                    // Check if this city is in the favorites array
                    // how? look at the localstorage array
                    // find indexOf
                    // true or false?
                    // if this localstorage key exists
                    if (this.getLocalStorage("favoriteCityArray")) {
                        //this.favoriteslistArray.indexOf(cityToRemove), 1);
                        // if this city is in this array
                        this.favoriteIcon = 'favorite';
                        // this city is not in the array
                        this.favoriteIcon = 'favorite_border';
                    }
                    else {
                    }
                    ;
                };
                AppComponent.prototype.addToFavorites = function (cityToAdd) {
                    // add this city to the localstorage favorites array
                    //get localstorage array first
                    //this.getLocalStorage("favoriteCityArray");
                    console.log("addToFavorites called..");
                    //save to localStorage
                    // push cityToAdd to the array and save to local storage
                    console.log(this.favoriteslistArray);
                    //this.favoriteslistArray.push(cityToAdd);
                    //this.saveLocalStorage("favoriteCityArray", this.favoriteslistArray); 
                };
                AppComponent.prototype.removeFromFavorites = function (cityToRemove) {
                    console.log("removeFromFavorites called.." + cityToRemove);
                    this.updatedfavoriteslistArray = this.favoriteslistArray.splice(this.favoriteslistArray.indexOf(cityToRemove), 1);
                    console.log("this.favoriteslistArray: " + this.updatedfavoriteslistArray);
                    this.saveLocalStorage("favoriteCityArray", this.updatedfavoriteslistArray);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app-root',
                        templateUrl: './app.component.html',
                        styleUrls: ['./app.component.css']
                    })
                ], AppComponent);
                return AppComponent;
            }());
            exports_2("AppComponent", AppComponent);
            // lets make this as simple as possible
            // page load nothing happens
            // type in a city name and search for the weather
            // so easy.... 
        }
    };
});
System.register("app/app.component.spec", ["@angular/core/testing", "app/app.component"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var testing_1, app_component_1;
    return {
        setters: [
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }
        ],
        execute: function () {
            describe('AppComponent', function () {
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        declarations: [
                            app_component_1.AppComponent
                        ]
                    }).compileComponents();
                }));
                it('should create the app', testing_1.async(function () {
                    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
                    var app = fixture.debugElement.componentInstance;
                    expect(app).toBeTruthy();
                }));
                it("should have as title 'app'", testing_1.async(function () {
                    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
                    var app = fixture.debugElement.componentInstance;
                    expect(app.title).toEqual('app');
                }));
                it('should render title in a h1 tag', testing_1.async(function () {
                    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
                    fixture.detectChanges();
                    var compiled = fixture.debugElement.nativeElement;
                    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
                }));
            });
        }
    };
});
