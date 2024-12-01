export interface Listing {
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
}

export interface Purchase {
    renterUserId: string;
    clientUserId: string;
    productPrice: number;
    rentStart: Date;
    rentFinish: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
}