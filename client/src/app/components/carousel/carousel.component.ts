import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slideIndex = 0
  constructor() { }

  ngOnInit(): void { }

  slide(direc: string) {
    if(direc === 'left') {
      this.slideIndex == 0 ? this.slideIndex = -200 : this.slideIndex += 100
    } else {
      this.slideIndex == -200 ? this.slideIndex = 0 : this.slideIndex -= 100
    }
  }
}
