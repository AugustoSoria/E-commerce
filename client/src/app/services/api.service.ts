import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { ProductModel } from '../models/product.interface';
import { setError } from '../state/actions/app.actions';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_LOGIN: string = 'http://localhost:3000/api/auth/login'
  private URL_REGISTER: string = 'http://localhost:3000/api/auth/register'
  private URL_VERIFYTOKEN: string = 'http://localhost:3000/api/auth/verifyToken'
  private URL_GETPRODUCTS: string = 'http://localhost:3000/api/products/getProducts'

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(usuario: any){
    return this.http.post(this.URL_LOGIN, usuario).pipe(
      tap(data => data), 
      catchError(this.handleError)
    )
  }

  register(usuario: any){
    return this.http.post(this.URL_REGISTER, usuario).pipe(
      tap(data => data), 
      catchError(this.handleError)
    )
  }

  verifyToken(token: string) {
    return this.http.post(this.URL_VERIFYTOKEN, {userToken: token}).pipe(
      tap(data => data), 
      catchError(this.handleError)
    )
  }

  getProducts() {
    return this.http.get<ProductModel[]>(this.URL_GETPRODUCTS).pipe(
      map(data => data.sort((a: any,b: any) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime())),
      catchError(this.handleError)
    )
  }

  private handleError = (error: HttpErrorResponse) => {
    return throwError(() => {
      if(error.status === 0) return this.addError('Internal Server Error')
      if(error.status === 500) return this.addError('Internal Server Error')
      if(error.url?.includes('register')) return this.addError(`Email in use`)
      if(error.url?.includes('login')) return this.addError(`Email or password are incorrect`)
      
      return this.addError(`ERROR ${error.status}, ${error.message}`)
    })
  }

  private addError(err: any) {
    this.store.dispatch(setError({error: err}))
  }
}
