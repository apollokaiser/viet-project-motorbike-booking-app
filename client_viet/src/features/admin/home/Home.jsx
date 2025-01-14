import BoxGroup from "@/features/admin/home/components/box/BoxGroup";
import ExpiredOrders from "./components/ExpiredOrders";
import RecentOrders from "./components/RecentOrders";

function Home() {
  return (
    <>
      <BoxGroup />
      <div className="content-2">
        <RecentOrders />
        <ExpiredOrders />
      </div>
    </>
  );
}

export default Home;
