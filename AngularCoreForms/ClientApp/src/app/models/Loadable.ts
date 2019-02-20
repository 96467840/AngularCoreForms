import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { iHash } from './Hash';

interface iErrorExternal {
  // код ошибки (скажем требуется авторизация и тогда компонент должен сделать редирект на форму логина с последующим возвратом на эту страницу)
  code?: number;
  // текстовое представление ошибки
  error?: string;
}
// чтоб не проверять по нескольку раз на андеф
export interface iError {
  code: number;
  error: string;
}

export const ERROR_UNKNOWN: number = -1;
export const ERROR_NETWORK: number = 1000;

export abstract class Loadable<T> {
  public loaded: boolean = false;
  protected isLoading: boolean = false;
  protected error: iError | null = null;
  protected data: T | null = null;
  abstract apiUrl: string;// = 'api/SampleData/WeatherForecasts';
  //protected baseUrl: string;
  //protected http: HttpClient;

  private _error(error: string, code: number) {
    this.loaded = false;
    this.data = null;
    console.error(error, code);

    this.error = { error: error, code: code };
  }

  private _load(url: string) {
    
    this.isLoading = true;
    this.error = null;

    this.http.get<T & iErrorExternal>(url).subscribe(result => {
      if (typeof result.error !== 'undefined') {
        this._error(result.error, result.code || ERROR_UNKNOWN);
      } else {
        this.loaded = true;
        this.data = result;
      }
    }, error => {
      // тут исключительно сетевые ошибки
      this._error('Network error:' + error, ERROR_NETWORK);
    }, () => {
      this.isLoading = false;
    });
  }

  public load(args?: iHash<string>) {
    console.log('...', this.baseUrl, this.apiUrl);
    this._load(this.baseUrl + this.apiUrl);
  }

  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string, protected location: Location) {
    //this.baseUrl = baseUrl;
    //this.http = http;
    //this.load();
  }

}
