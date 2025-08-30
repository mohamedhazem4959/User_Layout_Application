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
<<<<<<< HEAD
        subcategories: {
            _id: string;
            name: string;
            description: string;
            parentCategory: string | null;
            route: string;
            products?: IProducts[];
        }[];
=======
>>>>>>> 8487913880c2a68ee95c5a1caa0f1de125245b58
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 8487913880c2a68ee95c5a1caa0f1de125245b58
