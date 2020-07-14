import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from '../../account/account.service';
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$
      .pipe(
        flatMap(auth => {
          if (auth) {
            return of(true);
          }
          return this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        })
      );
  }
}
