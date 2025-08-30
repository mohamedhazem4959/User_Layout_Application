export interface IProducts {
    _id: string;
    name: string;
    stock: number;
    description: string;
    price: number;
    category: {
        _id: string;
        name: string;
        description: string;
        parentCategory: string | null;
        route: string;
        subcategories: {
            _id: string;
            name: string;
            description: string;
            parentCategory: string | null;
            route: string;
            products?: IProducts[];
        }[];
    };
    image: string;
    isDeleted: boolean;
    isActive: boolean;
    route: string;
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
    subCategories: {
        _id: string;
        name: string;
        description: string;
        parentCategory: string | null;
        route: string
    }[];
}
