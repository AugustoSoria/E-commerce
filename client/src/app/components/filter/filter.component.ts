import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.interface';
import { filterProductsList } from 'src/app/state/actions/app.actions';
import { AppState } from 'src/app/state/app.state';
import { selectProductsList } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  productsByCategory$: Observable<any> = new Observable()
  availableColors: string[] = []
  availableSizes: string[] = []
  filterQuery = {
    color: "All",
    size: "All"
  }
  @Input() category: string = '';

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.selectProductsByCategory()

    this.productsByCategory$.subscribe(p => 
      this.store.dispatch(filterProductsList(
        { productList: p }
      ))
    )

    this.productsByCategory$.pipe(
      map(pr => pr.map((p: { color: string; }) => 
        this.availableColors.indexOf(p.color) < 0  && 
        this.availableColors.push(p.color)))
    ).subscribe()

    this.productsByCategory$.pipe(
      map(pr => pr.map((p: { size: string; }) => 
        this.availableSizes.indexOf(p.size) < 0  && 
        this.availableSizes.push(p.size)))
    ).subscribe()
  }

  /*
    if we try to sort the initial products we will get an empty array, because when we try to sort the products
    filterQuery properties are All, so the conditional of the lines 67 and 69 are false and that does that the
    filteredProducts array never gets products
  */

  handleChange(e:any) {
    let filteredProducts: ProductModel[] = []
    console.log(e.target.name, e.target.value)
    console.log(this.filterQuery)

    if(e.target.value === 'All') {
      this.selectProductsByCategory()
    } else {
      console.log(this.filterQuery)

      this.productsByCategory$.pipe(
        map(pr => pr.map((p: ProductModel) => {
          this.filterQuery.size != "All" && p.size == this.filterQuery.size && filteredProducts.push(p)
          // console.log(p.size, "== ", this.filterQuery.size)
          this.filterQuery.color != "All" && p.color == this.filterQuery.color && filteredProducts.push(p)
          // console.log(p.color, "== ", this.filterQuery.color)
        }))
      ).subscribe()
      
      console.log("filteredProducts 1", filteredProducts)
    }

    console.log("filteredProducts 2", filteredProducts)

    if(e.target.value === 'price-desc') {
      filteredProducts.sort((a: any, b: any) => b.price - a.price)
    }
    
    if(e.target.value === 'price-asc') {
      filteredProducts.sort((a: any, b: any) => a.price - b.price)
    }

    if(e.target.value === 'newest') {
      filteredProducts.sort((a: any,b: any) => a.creation_date - b.creation_date)
    }

    console.log("set filteredProducts ", [...new Set(filteredProducts)])

    this.store.dispatch(filterProductsList(
      { productList: [...new Set(filteredProducts)] }
    ))
  }

  selectProductsByCategory() {
    //tomamos todos los productos q sean parte de x categoria
    this.productsByCategory$ = this.store.select(selectProductsList).pipe(
      map(pr => pr.filter(p => p.categories.includes(this.category)))
    ) //toma todo pero los filtra por categoria, asique es como si consumiera los filtered
  }
}
