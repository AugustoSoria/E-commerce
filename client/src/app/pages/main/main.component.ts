import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  userToken: any = ''
  serverErrors: any

  constructor(
    apiService: ApiService, 
    tokenService: TokenService,
  ) {
    this.userToken = localStorage.getItem('userToken')
    if(typeof this.userToken === typeof 'string'){
      apiService.verifyToken(this.userToken).subscribe( r => {
        tokenService.setUserToken(this.userToken)
      }
      )
    }
  }

  ngOnInit(): void {}
}
