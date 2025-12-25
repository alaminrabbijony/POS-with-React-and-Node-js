import type { OrderStatus } from "../util/style.js";

export type LoginProps = {
    email: string,
    password: string
}
export type RegisterProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export type ErrorRes = {
    message: string,
}
export type tableObjProps = {
  tableNo: string;
  seats: string;
  status: string
}

export type Table = {
  _id: string;        // from MongoDB
  tableNo: string;
  status: string;
  seats: string;
  currentOrder?: string |any;
};

type Customer = {
  name: string,
  phone: string,
  guests: string
}

type Bills = {
  total: number
  tax: number
  totalWithTax: number
}

type Item = {
  id: string
  price: number
  quantity: number
}
export type PaymentTypes ={
  _id: string,
  orderId: string,
  amount: number,
  provider: string,
  status: string,
}



export type OrderTypes = {
    _id: string,
    customerDetails: Customer,
    orderStatus: OrderStatus,
    orderDate: string,
    bills: Bills,
    items: Item[],
    table: Table,
    payment?: PaymentTypes
}

export type ReceiptTypes = {
  receipt: {
    transactionId: string
    amount: number
    method: string
    paidAt: string
  }
  order: {
    customer: {
      name: string
      phone?: string
      guests?: number
    }
    items: any[]
    bills: {
      totalWithTax: number
    }
    table?: {
      tableNo?: string
    }
    date: string
  }
  gateway?: {
    bank_tran_id?: string
    channel?: string
  }
}

