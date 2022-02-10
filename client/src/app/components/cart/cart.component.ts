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
    this.store.select(selectProductsCart).subscribe(p => this.productCart = p)
  }

  ngOnInit(): void {
    let totalporproducto: number[] = []
    this.productCart.map(p => {
      totalporproducto.push(p.price * p.amount)
    })
    this.subtotal = totalporproducto.reduce((acc,curr) => acc + curr, 0)
  }

  deleteProduct(index: number) {
    let spliceProducts = [...this.productCart]
    spliceProducts.splice(index, 1)
    this.productCart = spliceProducts
  }
}
