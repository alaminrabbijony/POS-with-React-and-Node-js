
import { BsCash } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import Greetings from "../comp/home/Greetings.js";
import MinCard from "../comp/home/MinCard.js";
import RecentOrders from "../comp/home/RecentOrders.js";
import PopularDishes from "../comp/home/PopularDishes.js";

export default function Home() {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex">
      
      {/* Left Section */}
      <div className="flex-[3] bg-[#1f1f1f]">
        <Greetings />
        
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MinCard
            title="Total Earnings"
            icon={<BsCash />}
            number={512}
            footerNum={1.6}
          />

          <MinCard
            title="In Progress"
            icon={<GrInProgress />}
            number={12}
            footerNum={3.6}
          />
        </div>

        <RecentOrders />
      </div>

      {/* Right Section */}
      <div className="flex-[2] bg-[#1f1f1f]">
        <PopularDishes />
      </div>

    </section>
  );
}
