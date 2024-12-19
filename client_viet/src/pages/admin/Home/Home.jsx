import BoxGroup from "@comps/admin/box/BoxGroup";
import ExpiredOrders from "@comps/admin/datatable/ExpiredOrders";
import RecentOrders from "@comps/admin/datatable/RecentOrders";

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
