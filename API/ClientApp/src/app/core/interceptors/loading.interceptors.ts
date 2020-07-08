import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusyService} from '../services/busy.service';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('emailexists')) {
      this.busyService.busy();
    }
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.busyService.idle();
        })
      );
  }

}
