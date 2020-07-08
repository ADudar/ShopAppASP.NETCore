import {Component, OnInit} from '@angular/core';
import {BasketService} from './basket/basket.service';
import {AccountService} from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private basketService: BasketService,
              private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId)
        .subscribe(() => {
          console.log('init basket');
        }, e => console.error(e));
    }
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token)
        .subscribe(() => {
          console.log('loaded user');
        }, e => console.error(e, 'load user error'));
    }
  }
}
