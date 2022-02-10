import { createReducer, on } from "@ngrx/store";
import { ECommerceState } from "src/app/models/e-commerce.state";
import { addToCart, filterProductsList, loadProducts, setError, setUserToken } from "../actions/app.actions";

export const initialState: ECommerceState = {
    productList: [],
    filteredProductList: [],
    productsCart: [],
    UserToken: '',
    errores: {error: ''}
}

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state, props) => {
        return {...state, productList: props.products}
    }),
    on(filterProductsList, (state, {productList}) => {
        return {...state, filteredProductList: productList}
    }),
    on(addToCart, (state, props) => {
        return {...state, productsCart: props.productsCart}
    }),
    on(setUserToken, (state, props) => {
        return {...state, UserSession: props.token}
    }),
    on(setError, (state, props) => {
        return {...state, errores: props.error}
    })
)