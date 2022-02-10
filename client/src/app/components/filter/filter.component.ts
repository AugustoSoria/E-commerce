import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { filterProductsList } from 'src/app/state/actions/app.actions';
import { AppState } from 'src/app/state/app.state';
import { selectProductsList } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filteredProducts$: Observable<any> = new Observable()
  availableColors: string[] = []
  availableSizes: string[] = []

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.filteredProducts$ = this.store.select(selectProductsList)

    this.filteredProducts$.pipe(
      map(pr => pr.map((p: { color: string; }) => 
        this.availableColors.indexOf(p.color) < 0  && 
        this.availableColors.push(p.color)))
    ).subscribe()

    this.filteredProducts$.pipe(
      map(pr => pr.map((p: { sizes: string; }) => 
        this.availableSizes.indexOf(p.sizes) < 0  && 
        this.availableSizes.push(p.sizes)))
    ).subscribe()
  }

  handleChange(e:any) {
    if(e.target.name === 'sort') {
      if(e.target.value === 'price-desc') {
        this.filteredProducts$.pipe(
          map(e => [...e].sort((a: any,b: any) => b.price - a.price))
        ).subscribe(p => {
          this.store.dispatch(filterProductsList(
            { productList: p }
          ))
        })
      }

      if(e.target.value === 'price-asc') {
        this.filteredProducts$.pipe(
          map(e => [...e].sort((a: any,b: any) => a.price - b.price))
        ).subscribe(p => {
          this.store.dispatch(filterProductsList(
            { productList: p }
          ))
        })
      }

      if(e.target.value === 'newest') {
        this.filteredProducts$.pipe(
          map(e => [...e].sort((a: any,b: any) => a.creation_date - b.creation_date))
        ).subscribe(p => {
          this.store.dispatch(filterProductsList(
            { productList: p }
          ))
        })
      }
    }

    if(e.target.name === 'size') {
      if(e.target.value === 'all'){
        this.filteredProducts$.subscribe(p => 
          this.store.dispatch(filterProductsList(
            { productList: p }
          ))
        )
      } else {
        this.filteredProducts$.pipe(
          map(pr => pr.filter((p: any) => p.sizes === e.target.value))
        ).subscribe(p => {
          this.store.dispatch(filterProductsList(
            { productList: p }
          ))
        })
      }
    }

    if(e.target.name === 'color') {
      this.filteredProducts$.pipe(
        map(pr => pr.filter((p: { color: any; }) => p.color === e.target.value))
      ).subscribe(p => {
        this.store.dispatch(filterProductsList(
          { productList: p }
        ))
      })
    }
  }
}
