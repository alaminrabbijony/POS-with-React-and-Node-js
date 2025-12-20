import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validatePayment } from '../https/index.js'

const PaymentProcessing = () => {
  const navigate = useNavigate()

  useEffect(()=> {
    const verify = async () => {
      try {
        // Validate payment 
        await validatePayment()
        // On success navigate to success page
        navigate('/payment/success')

      } catch (error) {
        console.log("Payment validation failed:", error);
        navigate('/payment/failure')
      }
    }
    verify()
  }, [])
}
  

export default PaymentProcessing
