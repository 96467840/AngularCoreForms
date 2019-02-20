import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loadable } from '../models';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent extends Loadable<WeatherForecast[]> implements OnInit {
  apiUrl: string = 'api/SampleData/WeatherForecasts';
  /*public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }*/

  ngOnInit() {
    console.log('FetchDataComponent.ngOnInit()');
    this.load();
  }
  ngOnDestroy() {
    console.log('FetchDataComponent.ngOnDestroy()');
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
