import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel, ProductsCartModel } from './models/product.interface';
import { ApiService } from './services/api.service';
import { addToCart, filterProductsList, loadProducts } from './state/actions/app.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-app';
  products: ProductModel[] = []
  storeProducts: ProductsCartModel[] = JSON.parse(localStorage.getItem('poductsCart') || '{}');

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getProducts()
      .subscribe((response: ProductModel[]) => {
        this.store.dispatch(loadProducts(
          { products: response }
        ))
        // this.store.dispatch(filterProductsList(
        //   { productList: response }
        // ))
      })

      this.store.dispatch(addToCart(
        { productsCart: this.storeProducts }
      ))
  }
}
