import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';

import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { ROOT_REDUCERS } from './state/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CategoriesComponent,
    PopularProductsComponent,
    NewsletterComponent,
    FooterComponent,
    FilterComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    MainComponent,
    HeaderComponent,
    CategoryComponent,
    ProductPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
