import { useEffect, useState } from "react";
import { getUserData } from "../https/index.js";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/redux/store.js";
import { addUser, removeUser } from "../store/redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const useLoadUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserData();
        const { _id, name, phone, role, email } = data.data;
        dispatch(addUser({ name, phone, role, email, isAuth: true }));
      } catch (error) {
        dispatch(removeUser());
        navigate("/auth");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    
    };
    fetchData();
    
  }, [dispatch, navigate]);
    return isLoading
};
export default useLoadUserData
