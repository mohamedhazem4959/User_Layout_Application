export interface ILogin {
    email:string;
    password:string;
}

export interface ILoginRes {
    message:string;
    token:string;
}

export interface IRegister {
    name:string;
    phoneNumber:string;
    email:string;
    password:string;
}

export interface IRegisterRes {
    msg:string
}


export interface IUserData{
    id:string;
    role:string;
    name:string;
    phoneNumber:string;
    email:string;
    shippingAddress:string;
    exp:number;
}