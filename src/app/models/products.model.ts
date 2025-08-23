export interface IProducts {
    _id:string;
    name: string;
    stock: number;
    description: string;
    price: number;
    category: string;
    isDeleted: boolean;
    isActive: boolean;
    route: string;
    image: string;
}

export interface IProductsRes {

    msg: string;
    data: {
        page: number;
        limit: number;
        totalPages: number;
        total: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: number | null;
        prevPage: number | null;
        result: IProducts[];
    };
}