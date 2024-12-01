export interface Listing {
    _id: string;
    userId: string;
    name: string;
    price: number;
    description: string;
    category: string;
    components: {
        name: string;
        description: string;
        quantity: number;
        required: boolean;
    };
    status: string;
}

export interface Purchase {
    _id: string
    renterUserId: string;
    clientUserId: string;
    productPrice: number;
    rentStart: Date;
    rentFinish: Date;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
}