import OrderControlToolbar from "./components/OrderControlToolbar";
import OrderListContent from "./components/OrderListContent";

function OrderListPage() {
  return (
    <>
      <OrderControlToolbar />
      <div className="content-2 pt-3">
        <OrderListContent />
      </div>
    </>
  );
}

export default OrderListPage;
