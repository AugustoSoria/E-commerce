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
    this.productsByCategory$ = this.selectProductsByCategory()

    this.productsByCategory$.subscribe((p: ProductModel[]) => 
      this.store.dispatch(filterProductsList(
        { productList: p }
      ))
    )

    this.productsByCategory$.forEach((pr: ProductModel[]) => {
      pr.forEach((p: ProductModel) => {
        this.availableColors.indexOf(p.color) < 0  && this.availableColors.push(p.color)
        this.availableSizes.indexOf(p.size) < 0  && this.availableSizes.push(p.size)
      })
    })
  }

  handleChange(e:any) {
    let filteredProducts: ProductModel[] = []

    /* First depending of the filterQuery object, we filter the products */
    /* 
      If the filtereQuery object has an All value, we bring all the products from the select selectProductsByCategory
      and we push all that products to filteredProducts Array
    */
    if(this.filterQuery.size == "All" && this.filterQuery.color == "All") {
      this.selectProductsByCategory().forEach((pr: ProductModel[]) => {
        pr.forEach(p => filteredProducts.push(p))
      })
    } 

    /* 
      If the filtereQuery object has not an All value, we use the productsByCategory variable to filter the products
      depending of the filterQuery Object
    */
    if(this.filterQuery.size != "All" && this.filterQuery.color != "All") {
      this.productsByCategory$.forEach((pr: ProductModel[]) => {
        pr.forEach(p => p.color == this.filterQuery.color && p.size == this.filterQuery.size && filteredProducts.push(p))
      })
    }

    /* 
      If the filtereQuery object has at least an All value, we use just one property of the filterQuery object
    */
    if(this.filterQuery.size != "All" && this.filterQuery.color == "All") {
      this.productsByCategory$.forEach((pr: ProductModel[]) => {
        pr.forEach(p => p.size == this.filterQuery.size && filteredProducts.push(p))
      })
    }

    if(this.filterQuery.color != "All" && this.filterQuery.size == "All") {
      this.productsByCategory$.forEach((pr: ProductModel[]) => {
        pr.forEach(p => p.color == this.filterQuery.color && filteredProducts.push(p))
      })
    }

    /* One time that we have the selected products, we are going to order them */
    if(e.target.value === 'price-desc') {
      filteredProducts.sort((a: any, b: any) => b.price - a.price)
    }
    
    if(e.target.value === 'price-asc') {
      filteredProducts.sort((a: any, b: any) => a.price - b.price)
    }

    if(e.target.value === 'newest') {
      filteredProducts.sort((a: any,b: any) => a.creation_date - b.creation_date)
    }

    /* And like last step we dispatch the filterProductsList action so the popular-products component to have them */
    this.store.dispatch(filterProductsList(
      { productList: [...new Set(filteredProducts)] }
    ))
  }

  selectProductsByCategory() {
    // Get all the products of category like this.category
    return this.store.select(selectProductsList).pipe(
      map((pr: ProductModel[]) => pr.filter(p => p.categories.includes(this.category)))
    )
  }
}
