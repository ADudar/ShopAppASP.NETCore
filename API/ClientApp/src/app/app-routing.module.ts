import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TestErrorComponent} from './core/test-error/test-error.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ServerErrorComponent} from './core/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test errors'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not found'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server error'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule), data: {breadcrumb: 'Basket'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
