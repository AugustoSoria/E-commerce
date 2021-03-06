import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectFilteredProductsList } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {
  filteredProducts$: Observable<any> = new Observable()
  @Input() category: string = '';

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.filteredProducts$ = this.store.select(selectFilteredProductsList)

    if(this.category.length > 0) {
      this.filteredProducts$ = this.filteredProducts$.pipe(
        map(pr => pr.filter((p: { categories: string[]; }) => p.categories.includes(this.category)))
      )
    } else {
      this.filteredProducts$ = this.store.select(selectFilteredProductsList).pipe(map(p => p.slice(0,4)))
    }
  }
}