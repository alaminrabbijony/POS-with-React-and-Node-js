import { motion } from "framer-motion"

type CustomeLoaderProps = {
  message?: string
}

const CustomeLoader = ({ message = "Loading..." }: CustomeLoaderProps) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#2f2f2f]" />
          <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <p className="text-sm text-gray-400 tracking-wide">
          {message}
        </p>
      </motion.div>
    </div>
  )
}

export default CustomeLoader
