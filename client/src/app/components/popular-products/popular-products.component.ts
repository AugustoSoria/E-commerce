import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.interface'
import { AppState } from 'src/app/state/app.state';
import { selectFilteredProductsList, selectProductsList } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {
  filteredProducts$: Observable<ProductModel[]> = new Observable()
  @Input() category: string = '';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    if(this.category.length > 0) {
      this.filteredProducts$ = this.store.select(selectFilteredProductsList).pipe(
        map(pr => pr.filter(p => p.categories.includes(this.category)))
      )
      return;
    }

    this.filteredProducts$ = this.store.select(selectProductsList).pipe(map(p => p.slice(0,4)))
  }
}