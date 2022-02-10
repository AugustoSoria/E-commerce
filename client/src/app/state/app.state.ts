import { ActionReducerMap } from "@ngrx/store";
import { ECommerceState } from "../models/e-commerce.state";
import { productsReducer } from "./reducers/app.reducers";

export interface AppState {
    products: ECommerceState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productsReducer
}
