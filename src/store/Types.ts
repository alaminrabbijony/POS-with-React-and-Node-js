export type CustomerInfoTypes = {
    orderId: string;
    customerName: string;
    customerPhone: string;
    guest: number;
    table: object | null;
}

export type MenuItem = {
  id: number; // change this to `string` when there will be dynamic menu for DB;
  name: string;
  price: number;
};

export type CartItem = {
    id: string | number;
    name:  string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export type CartState = {
    items: CartItem[];
    quantity: number;
    totalPrice: number;
}

export type UserInfoState = {
    _id?: string | undefined,
    name: string,
    phone: string,
    email: string,
    token?: string | undefined,
    role: string, // for authorization
    isAuth: boolean
}
