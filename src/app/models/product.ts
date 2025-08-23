export interface IProduct {
    name:string;
    stock:number;
    description:string;
    price:number;
    category:string;
    image:string;
    isDeleted:boolean;
    isActive:boolean;
    route:string
}

export interface IProductRes {
    msg:string;
    data:IProduct
}