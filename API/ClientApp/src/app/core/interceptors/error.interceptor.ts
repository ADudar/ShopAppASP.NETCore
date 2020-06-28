import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(e => {
          if (e) {
            if (e.status === 404) {
              this.router.navigateByUrl('/not-found');
            }
            if (e.status === 500) {
              this.router.navigateByUrl('/server-error');
            }
          }
          return throwError(e);
        })
      )
  }

}
