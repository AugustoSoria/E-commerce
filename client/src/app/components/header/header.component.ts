import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel, ProductsCartModel } from 'src/app/models/product.interface';
import { TokenService } from 'src/app/services/token.service';
import { AppState } from 'src/app/state/app.state';
import { selectProductsCart } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productsCart: ProductsCartModel[] = []
  userToken$: Observable<any> = new Observable()

  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.store.select(selectProductsCart).subscribe(p => this.productsCart = p)
    this.userToken$ = this.tokenService.getUserToken()
  }

  ngOnInit(): void {}

  handleSession() {
    let token
    this.userToken$.subscribe(t => token = t.userToken)
    
    if(token){
      this.tokenService.removeUserToken()
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  redirect(e: any) {
    let value = e.target['1'].value.toLowerCase().replace(' ', '-')
    if(value === ('shirt-style' || 'loungewear-love' || 'light-jackets')) {
      this.router.navigate([`/category/${value}`]);
    }
  }
}
