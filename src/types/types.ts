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
