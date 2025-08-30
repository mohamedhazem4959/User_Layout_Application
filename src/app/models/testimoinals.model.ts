import { IUserData } from "./user.model";

export interface ITestimoinals {
    _id:string;
    user:IUserData;
    message:string;
    rating:string;
    createdAt?:string;
    isDeleted?:boolean
}

export interface ITestimoinalsRes {
    msg:string;
    data:ITestimoinals[];
}

