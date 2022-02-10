import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private userTokenObservable: BehaviorSubject<any> = 
    new BehaviorSubject({userToken: ''})

  getUserToken() {
    return this.userTokenObservable
  }

  setUserToken(token: string) {
    this.userTokenObservable.next({userToken: token})
    localStorage.setItem('userToken', token)
  }

  removeUserToken() {
    localStorage.removeItem('userToken')
  }
}
