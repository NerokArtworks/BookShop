import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, map, Observable, ReplaySubject, throwError } from 'rxjs';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  private peticionesPendientes=0;
  private patronFiltrado:RegExp[]=[];

  private estadoPeticionPendiente:ReplaySubject<boolean>=new ReplaySubject<boolean>(1);

  constructor(private router:Router) {
    router.events.subscribe(event=>{
      if (event instanceof NavigationStart){
        this.estadoPeticionPendiente.next(true);
      }
      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel){
        this.estadoPeticionPendiente.next(false);
      }
    })
  }

private debePasar(url:string):boolean{
return this.patronFiltrado.some(e=>{
  return e.test(url);
})
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const debepasar=this.debePasar(request.url);
    const token:any=localStorage.getItem('token');
    if (token){
      request=request.clone({headers:request.headers.set('Autorizathion','Bearer'+token)});
      }
    
      request=request.clone({headers:request.headers.set('Content-type','application/json')})

    if (!request.headers.has('Content-type')){
      request=request.clone({headers:request.headers.set('Accept','application/json')})
    }

    if (!debepasar){
      this.peticionesPendientes++;
      if (1===this.peticionesPendientes){
        this.estadoPeticionPendiente.next(true);
      }
    }

    return next.handle(request).pipe(map(event=>{
      return event;}),
      catchError(error=>{
        return throwError(error);}),
      finalize(()=>{
        if(!debepasar){
          this.peticionesPendientes--;
          if (0===this.peticionesPendientes){
            this.estadoPeticionPendiente.next(false);
          }
        }
      })

    )
  }
}
