import { createAction, props } from '@ngrx/store';
import { ProductModel, ProductsCartModel } from 'src/app/models/product.interface';
import { UserModel } from 'src/app/models/user.interface';

export const loadProducts = createAction(
    '[Products List] Loaded success',
    props<{ products: ProductModel[] }>()
)

export const filterProductsList = createAction(
    '[Filtered Products List] Loaded success',
    props<{ productList: ProductModel[] }>()
)

export const addToCart = createAction(
    '[Products Cart List] Add product to cart',
    props<{ productsCart: ProductsCartModel[] }>()
)

export const setUserToken = createAction(
    '[Login] Add a user session',
    props<{ token: string }>()
)

export const setError = createAction(
    '[HTTP ERRORs] Add Error',
    props<{ error: any }>()
)