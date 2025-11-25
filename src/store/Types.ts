export type CustomerInfoTypes = {
    orderId: string;
    customerName: string;
    customerPhone: string;
    guest: number;
    tableNo: string | number;
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