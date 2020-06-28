import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get404Error() {
    return this.http.get(`${this.baseUrl}products/42`)
      .subscribe(response => {
        console.log(response);
      }, e => console.log(e));
  }

  get500Error() {
    return this.http.get(`${this.baseUrl}buggy/servererror`)
      .subscribe(response => {
        console.log(response);
      }, e => console.log(e));
  }

  get400Error() {
    return this.http.get(`${this.baseUrl}buggy/badrequest`)
      .subscribe(response => {
        console.log(response);
      }, e => console.log(e));
  }

  get400ValidationError() {
    return this.http.get(`${this.baseUrl}products/fortytwo`)
      .subscribe(response => {
        console.log(response);
      }, e => {
        console.log(e);
        this.validationErrors = e.errors;
      });
  }

}
