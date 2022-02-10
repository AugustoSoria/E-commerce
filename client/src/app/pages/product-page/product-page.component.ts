import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.interface';
import { selectProduct } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  id: string = '';

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => 
      this.id = params['id']
    )
  }

  ngOnInit(): void {}
}
