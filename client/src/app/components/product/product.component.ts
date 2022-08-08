import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel, ProductsCartModel } from 'src/app/models/product.interface';
import { TokenService } from 'src/app/services/token.service';
import { addToCart } from 'src/app/state/actions/app.actions';
import { AppState } from 'src/app/state/app.state';
import { selectProduct } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  storeProducts: ProductsCartModel[] = []
  product!: ProductModel; 
  productsToAdd: ProductsCartModel[] = [] 
  amount: number = 1
  size: string = 'XS'
  @Input() id: string = ''
  userToken = {userToken: ''}

  constructor(
    private store: Store<AppState>, 
    private tokenService: TokenService
  ){
    this.storeProducts =  JSON.parse(localStorage.getItem('poductsCart') || '{}');
    this.tokenService.getUserToken().subscribe(t => this.userToken = t)
  }

  ngOnInit(): void {
    if(this.id) {
      this.store.select(selectProduct(Number(this.id))).subscribe(p => this.product = p!)
    }
  }

  addToCartFunction() {
    if(this.userToken.userToken) {
      this.productsToAdd = this.storeProducts.concat({
        ...this.product,
        amount: this.amount, 
        added_date: new Date(), 
        chosenSize: this.size
      })
      
      this.store.dispatch(addToCart(
        { productsCart: this.productsToAdd }
      ))

      localStorage.setItem('poductsCart', JSON.stringify(this.productsToAdd))
    } else {
      alert('You need to be registered')
    }
  }
}
