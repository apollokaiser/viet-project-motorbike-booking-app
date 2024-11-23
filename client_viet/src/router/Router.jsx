import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "../layouts/ProductDetail.jsx";
import AddBikes from "../layouts/AddBikes.jsx";
import Page from "../layouts/Page.jsx";
import Home from "../layouts/Home.jsx";
import SearchResult from "../layouts/SearchResult.jsx";
import Cart from "@comps/cart/Cart.jsx";
import { getXe } from "@/apis/getData.js";
import OrderStatus from "@/layouts/OrderStatus.jsx";
import OrderSuccess from "@comps/payment/OrderSuccess.jsx";
import OrderFail from "@comps/payment/OrderFail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        path: "",
        element: <Home />,
        index: true,
      },
      {
        path: "/add-bikes",
        element: <AddBikes />,
      },
      {
        path: "/chi-tiet-xe/:id",
        element: <ProductDetail />,
        loader: async ({ params }) => {
          const result = await getXe(params.id);
          return result.data;
        },
      },
      {
        path: "/tim-kiem",
        element: <SearchResult />,
      },
      {
        path: "/gio-hang",
        element: <Cart />,
      },
    ],
  },
  {
    path: "thanh-toan/",
    element: <OrderStatus />,
    children: [
      {
        path: "thanh-cong",
        element: <OrderSuccess />,
      },
      {
        path:"that-bai",
        element: <OrderFail />
      }
    ],
  },
]);
function Router({ children }) {
  return (
    <>
      <RouterProvider router={router}>{children}</RouterProvider>
    </>
  );
}

export default Router;
