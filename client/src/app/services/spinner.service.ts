import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerObservable: BehaviorSubject<any> = 
    new BehaviorSubject({isFetching: false})

  constructor() {}

  getSpinnerState() {
    return this.spinnerObservable
  }

  setSpinnerState(isFetching: boolean) {
    this.spinnerObservable.next({isFetching: isFetching})
  }
}
