import React, { useEffect, useState } from "react";
import { getTableData } from "../https/index.js";
import { useDispatch } from "react-redux";
import { createTable, getTables, removeTable } from "../store/redux/slices/tableSlice.js";

const useLoadTableData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTableData();

        dispatch(getTables(data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  return isLoading;
};

export default useLoadTableData;
