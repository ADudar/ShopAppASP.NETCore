import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  products;

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50')
      .subscribe((response: any) => {
        this.products = response.data;
      }, e => console.error(e));
  }

}
