import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { validatePayment } from "../https/index.js";
import { enqueueSnackbar } from "notistack";

const PaymentProcessing = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();



  //const paymentId = localStorage.getItem("paymentId");
  const params = new URLSearchParams(location.search)
  const status = params.get("status");
  const paymentId = params.get("paymentId");

 
  console.log("Payment ID from localStorage:", paymentId);
  useEffect(() => {
    const verify = async () => {
      if (!paymentId) {
        enqueueSnackbar("Payment session lost. Please contact support.", {
          variant: "error",
        });
        navigate("/payment/failure");
        return;
      }

      try {
        // Validate payment
       // await validatePayment(paymentId);
        // On success navigate to success page
        enqueueSnackbar("Payment successful!", { variant: "success" });
        navigate("/payment/success");
      } catch (error: any) {
        console.log("Payment validation failed:", error);
        const msg =
          error.response?.data?.message ||
          error.message ||
          "Payment verification failed";
        enqueueSnackbar(msg, { variant: "error" });
        navigate("/payment/failure");
      } finally {
        setIsLoading(false);
        localStorage.removeItem("paymentId");
        localStorage.removeItem("orderId");
      }
    };
    verify();
  }, [paymentId, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h2>Processing Payment</h2>

      <p style={{ opacity: 0.7 }}>
        {status === "success" && "Confirming your payment..."}
        {status === "failure" && "Payment failed. Verifying..."}
        {status === "cancel" && "Payment cancelled. Verifying..."}
        {!status && "Please wait..."}
      </p>

      {isLoading && <div className="spinner" />}
    </div>
  );
};

export default PaymentProcessing;
