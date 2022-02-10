import { createSelector } from "@ngrx/store";
import { ECommerceState } from "src/app/models/e-commerce.state";
import { AppState } from "../app.state";

export const selectProductsFeature = (state: AppState) => state.products;

export const selectProductsList = createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.productList
);

export const selectFilteredProductsList = createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.filteredProductList
);

export const selectProduct = (id: number) => createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.filteredProductList.find(p => p.id === id)
);

export const selectProductsCart = createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.productsCart
);

export const getUserToken = createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.UserToken
);

export const getError = createSelector(
    selectProductsFeature,
    (state: ECommerceState) => state.errores
);
