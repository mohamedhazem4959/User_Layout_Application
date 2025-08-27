import { IUserData } from "./user.model";

export interface IOrder {
    user:IUserData;
    status:string;
    items:IOrderItemsResponse[];
    totalPrice:number;
    shippingAddress:string;
    _id:string;
}

export interface IOrderItems {
    productId:string;
    quantity:number;
    price:number;
}

export interface IOrderItemsResponse {
    product: {
        _id:string;
        name:string;
        price:number;
        route:string;
    };
    quantity:number;
    price:number;
}

export interface IOrderRes {
    msg: string;
    data:{
        _id:string;
        user:IUserData;
        status:string;
        items:IOrderItemsResponse[];
        totalPrice:number;
        shippingAddress:string;
    }
}

// export interface IorderRes {
//     data:IOrder
// }