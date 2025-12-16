import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { loginUser } from "../../https/index.js";
import type { ErrorRes, LoginProps } from "../../types/types.js";
import { enqueueSnackbar } from "notistack";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { addUser } from "../../store/redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };
  const loginMutation = useMutation<any, AxiosError<ErrorRes>, LoginProps>({
    mutationFn: (reqData) => loginUser(reqData),
    onSuccess: (res) => {
      const { data } = res;
      const {_id, name, phone, email, role} = data.data
      dispatch(addUser({ name, phone, email, role, isAuth: true}))
      navigate('/')
      
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      enqueueSnackbar(message);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor=""
            className="block
                text-[#ababab] mb-2 mt-3 text-sm font-medium"
          >
            Employee Email
          </label>
          <div
            className="flex item-center rounded-lg p-5
                px-4 bg-[#1f1f1f]"
          >
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="bg-transparent flex-1 
                        text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor=""
            className="block
                text-[#ababab] mb-2 mt-3 text-sm font-medium"
          >
            Password
          </label>
          <div
            className="flex item-center rounded-lg p-5
                px-4 bg-[#1f1f1f]"
          >
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 
                        text-white focus:outline-none"
            />
          </div>
        </div>
        <button
          className="w-full rounded-lg mt-6 
        py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
