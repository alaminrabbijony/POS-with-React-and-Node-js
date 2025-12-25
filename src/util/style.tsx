import type { JSX } from "react"
import { FaCheckCircle, FaClock, FaQuestionCircle, FaTimesCircle, FaUndo } from "react-icons/fa"
export type OrderStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED"

export const DEFAULT_STATUS_STYLE = {
  label: "Processing",
  bg: "bg-slate-500/10",
  text: "text-slate-400",
  icon: <FaQuestionCircle className="text-slate-400" />,
}

export const ORDER_STATUS_STYLES = {
  
  CREATED: {
    label: "CREATED",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: <FaClock className="text-yellow-400" />,
  },
  PAYMENT_PENDING: {
    label: "PENDING",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    icon: <FaCheckCircle className="text-green-400" />,
  },
  PAYMENT_COMPLETED: {
    label: "PAYMENT COMPLETED",
    bg: "bg-green-500/10",
    text: "text-green-400",
    icon: <FaCheckCircle className="text-green-400" />,
  },
  PAYMENT_FAILED: {
    label: "FAILED",
    bg: "bg-red-500/10",
    text: "text-red-400",
    icon: <FaTimesCircle className="text-red-400" />,
  },
} as const
export const getOrderStatusStyle = (status?: string) => {
  if (!status) return DEFAULT_STATUS_STYLE

  const normalized = status.trim().toUpperCase()

  return (
    ORDER_STATUS_STYLES[
      normalized as keyof typeof ORDER_STATUS_STYLES
    ] ?? DEFAULT_STATUS_STYLE
  )
}