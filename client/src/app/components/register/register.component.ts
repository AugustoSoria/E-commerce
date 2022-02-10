import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { getError } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmPassErr = false
  error = ''

  fg: FormGroup

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private store: Store<AppState>
  ) {
    this.fg = fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])],
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
      confirmPassword: '',
    })
  }

  ngOnInit(): void {
    this.store.select(getError).subscribe(err => this.error = err.error)
  }

  handleClick(){
    let data = this.fg.value
    data.confirmPassword !== data.password ? this.confirmPassErr = true : this.confirmPassErr = false
    
    if(!this.confirmPassErr) {
      this.apiService.register(data)
      .subscribe()
    }
  }
}
