export interface ProductModel {
    id: number;
    title: string;
    des: string;
    img: string;
    price: number;
    size: string;
    color: string;
    categories: string;
    inStock: number;
    creation_date: Date;
}

export interface ProductsCartModel {
    id: number;
    img: string;
    title: string;
    des: string;
    price: number;
    categories: string;
    size: string;
    color: string;
    inStock: number;
    creation_date: Date;
    added_date: Date;
    amount: number;
    chosenSize: string;
}