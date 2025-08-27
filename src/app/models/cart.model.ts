import { IUserData } from "./user.model";

export interface ICart {
    _id: string;
    user: IUserData;
    items: ICartItemResponse[];
    totalPrice: number;
    status: string;
}

export interface ICartItems {
    productId: string;
    quantity: number;
    price?: number;
}
export interface ICartItemResponse {
    product: {
        _id: string;
        name: string;
        price: number;
        route:string
    };
    quantity: number;
    price: number;
}

export interface ICartRes {
    msg: string;
    data: {
        user: IUserData,
        items: ICartItemResponse[],
        _id:string;
    }
}