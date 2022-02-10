import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';
import { getError } from 'src/app/state/selectors/app.selectors';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userToken = {userToken: ''}
  fetching: Observable<any>
  serverErrors: Observable<{}> = new Observable()

  fg: FormGroup
  
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router,
    private store: Store<AppState>,
    private spinner: SpinnerService,
    fb: FormBuilder, 
  ) {
    this.fetching =  this.spinner.getSpinnerState()
    this.fg = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(35),
        Validators.pattern(/^\w+@[a-z]+\.[a-z]+(\.\w+)?$/gmi)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])],
    })
  }

  ngOnInit(): void {}

  handleClick() {
    let data = this.fg.value
    this.spinner.setSpinnerState(true)

    this.apiService.login({
      email: data.email,
      password: data.password,
    })
    .subscribe((user: any) => this.tokenService.setUserToken(user.accessToken))
    
    this.serverErrors = this.store.select(getError)

    setTimeout(() => {
      this.serverErrors.subscribe()
      this.spinner.setSpinnerState(false)
    }, 4000)

    this.tokenService.getUserToken().subscribe(t => {
      this.userToken = t
      if(this.userToken.userToken) this.router.navigate(['/']) 
    })
  }
}
