import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  category: string = ''
  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => 
      this.category = params['category']
    )
  }

  ngOnInit(): void {
  }

}
