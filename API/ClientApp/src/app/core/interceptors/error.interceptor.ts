import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toastr: ToastrService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(e => {
          if (e) {
            if (e.status === 400) {
              this.toastr.error(e.error.message, e.error.statusCode)
            }
            if (e.status === 401) {
              this.toastr.error(e.error.message, e.error.statusCode)
            }
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
