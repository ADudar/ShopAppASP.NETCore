import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BasketService} from '../../basket/basket.service';
import {CheckoutService} from '../checkout.service';
import {ToastrService} from 'ngx-toastr';
import {IBasket} from '../../models/basket';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService,
              private checkoutService: CheckoutService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate)
      .subscribe(() => {
        this.toastr.success('Order was created successfully');
        this.basketService.deleteLocalBasket();
      }, e => {
        this.toastr.error(e.message);
        console.error(e);
      });
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,

    };
  }
}
