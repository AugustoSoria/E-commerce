import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsCartModel } from 'src/app/models/product.interface';
import { AppState } from 'src/app/state/app.state';
import { selectProductsCart } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productCart: ProductsCartModel[] = [];
  subtotal = 0

  constructor(private store:Store<AppState>) {
    this.store.select(selectProductsCart).subscribe((p: ProductsCartModel[]) => this.productCart = p)
  }

  ngOnInit(): void {
    let totalPerProduct: number[] = []
    this.productCart.map(p => {
      totalPerProduct.push(p.price * p.amount)
    })
    this.subtotal = totalPerProduct.reduce((acc,curr) => acc + curr, 0)
  }

  deleteProduct(index: number) {
    this.productCart = this.productCart.filter((p, i) => i != index)
    localStorage.setItem('poductsCart', JSON.stringify(this.productCart))
  }
}
