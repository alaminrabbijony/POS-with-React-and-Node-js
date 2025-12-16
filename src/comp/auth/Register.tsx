import React, { useState } from "react";
import type { ErrorRes, RegisterProps } from "../../types/types.js";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../https/index.js";
import type { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { addUser } from "../../store/redux/slices/userSlice.js";
import { Role } from "../../const/const.js";

const regObj: RegisterProps = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "",
};

const Register = ({ setRegistered }: any) => {
  const [formData, setFormData] = useState<RegisterProps>(regObj);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleRoleSelection = (selectedRole: string) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const registerMutation = useMutation<
    any,
    AxiosError<ErrorRes>,
    RegisterProps
  >({
    mutationFn: (reqData) => registerUser(reqData),
    onSuccess: (res) => {
      const { data } = res;
      console.log(data)

      setFormData(regObj);
      enqueueSnackbar(data.message, { variant: "success" });

      setTimeout(() => {
        setRegistered(false);
      }, 1500);
    },

    onError: (err) => {
      const message =
        err.request?.data?.message || "Something just broke in registration";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor=""
            className="block
                text-[#ababab] mb-2 text-sm font-medium"
          >
            Employee Name
          </label>
          <div
            className="flex item-center rounded-lg p-5
                px-4 bg-[#1f1f1f]"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
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
            Employee phone number
          </label>
          <div
            className="flex item-center rounded-lg p-5
                px-4 bg-[#1f1f1f]"
          >
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter employee phone number"
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
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
            Chose tour role
          </label>
          <div className="flex item-center gap-3 mt-4">
            {Role.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full
                    rounded-lg text-white
                     ${
                       formData.role === role
                         ? "bg-yellow-600 text-[#1f1f1f]"
                         : ""
                     }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full rounded-lg mt-6 
        py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
