import { ProductModel, ProductsCartModel } from "./product.interface";

export interface ECommerceState {
    productList: ReadonlyArray<ProductModel>
    filteredProductList: ProductModel[]
    productsCart: ProductsCartModel[]
    UserToken: string
    errores: {error: ''}
}