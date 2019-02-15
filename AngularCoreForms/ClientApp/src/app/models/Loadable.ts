import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iHash } from './Hash';

interface iError {
  // код ошибки (скажем требуется авторизация и тогда компонент должен сделать редирект на форму логина с последующим возвратом на эту страницу)
  code?: number;
  // текстовое представление ошибки
  error?: string;
}

export abstract class Loadable<T> {
  protected loaded: boolean = false;
  protected isLoading: boolean = false;
  protected error?: string;
  protected data: T | null = null;
  protected baseUrl: string;
  abstract apiUrl: string = 'api/SampleData/WeatherForecasts';
  protected http: HttpClient;

  private _error(error: string, code?: number) {
    this.loaded = false;
    this.data = null;
    console.error(error, code);

    this.error = error;
  }

  private _load(url: string) {
    
    this.isLoading = true;
    this.error = undefined;

    this.http.get<T & iError>(url).subscribe(result => {
      if (typeof result.error !== 'undefined') {
        this._error(result.error, result.code);
      } else {
        this.loaded = true;
        this.data = result;
      }
    }, error => {
      // тут исключительно сетевые ошибки
      this._error('Network error:' + error, 1000);
    }, () => {
      this.isLoading = false;
    });
  }

  public load(args?: iHash<string>) {
    console.log('...', this.baseUrl, this.apiUrl);
    this._load(this.baseUrl + this.apiUrl);
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.load();
  }

}
