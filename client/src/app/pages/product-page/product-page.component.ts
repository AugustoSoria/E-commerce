import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
