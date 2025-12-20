import { useEffect, useState } from "react";
import { getReceipt } from "../https/index.js";



type reciptDataProps = {
    orderId: string;
    items: Array<any>;
    bills: {
        total: number;
        tax: number;
        totalWithTax: number;
    }
    customerDetails: {
        name: string;
        phone: string;
        guests: number;
    };
    date: Date;
    table: any;
}

const useLoadOrderData = (id: string | null) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<reciptDataProps | null>(null);
    useEffect(()=> {
        if(!id) return;
            const fetchData = async () => {
               try {
                const res = await getReceipt(id);

                setData({
                    orderId: res.data._id,
                    items: res.data.items,
                    bills: res.data.bills,
                    customerDetails: res.data.customer,
                    date: res.data.date,
                    table: res.data.table,
                })

               } catch (error) {
                    console.log(error);
               }finally{
                setLoading(false);
               }
            }
        fetchData()
    }, [id])
    return { isLoading, data };
}

export default useLoadOrderData;