import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iForm } from '../abstractions';
import { Loadable } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends Loadable<iForm> implements OnInit {
  apiUrl: string = 'api/SampleData/WeatherForecasts';

  ngOnInit() {
    console.log('FormComponent.ngOnInit()');
    this.load();
  }

}
