import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Admin
import ProductContent from "@/features/admin/vehicle/components/ProductContent.jsx";
import UpdateProductPage from "@/features/admin/vehicle/UpdateProductPage.jsx";
import RentalCompletion from "@/features/admin/order/RentalCompletion.jsx";
import AdminLoginPage from "@/features/admin/login/AdminLoginPage.jsx";
import ProductPage from "@/features/admin/vehicle/ProductPage.jsx";
import AdminHome from "@/features/admin/home/Home.jsx";
//Web (user)
import ProductDetailPage from "@/features/web/vehicle/ProductDetailPage.jsx";
import OrderSuccess from "@/features/web/payment/OrderSuccess.jsx";
import OrderStatus from "@/features/web/payment/PaymentStatus.jsx";
import SearchPage from "../features/web/search/SearchResult.jsx";
import OrderFail from "@/features/web/payment/OrderFail.jsx";
import HomePage from "../features/web/home/HomePage.jsx";
import UserPage from "@/features/web/user/UserPage.jsx";
import CartPage from "@/features/web/cart/CartPage.jsx";
//Error(for all)
import Unauthorized from "@/features/error/Unauthorized.jsx";
import NotFound from "@/features/error/NotFound.jsx";
//layouts
import AdminPage from "@/features/admin/layout/Page.jsx";
import WebPage from "@/features/web/layout/Page.jsx";

import ProductService from "@/services/ProductService.js";
import JWTService from "@/services/JWTService.js";
import ReportPage from "@/features/admin/report/ReportPage.jsx";
import UserInfo from "@/features/web/user/UserInfo.jsx";
import OrderHistory from "@/features/web/user/OrderHistory.jsx";
import OrderHistoryContent from "@/features/web/user/components/OrderHistoryContent.jsx";
import OrderInfomation from "@/features/web/user/OrderInfomation.jsx";
import ProductListPage from "@/features/web/vehicle/ProductListPage.jsx";
import OrderListPage from "@/features/admin/order/OrderListPage.jsx";
import SettingPage from "@/features/admin/settings/SettingPage.jsx";
import DescriptionSetting from "@/features/admin/settings/DescriptionSetting.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <WebPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/chi-tiet-xe/:id",
        element: <ProductDetailPage />,
        loader: async ({ params }) => {
          const result = await ProductService.getBike(params.id);
          return result.data;
        },
      },
      {
        path: "/tim-kiem",
        element: <SearchPage />,
      },
      {
        path: "/danh-sach-xe",
        element: <ProductListPage />,
      },
      {
        path: "/gio-hang",
        element: <CartPage />,
      },
      {
        path: "/khach-hang",
        element: <UserPage />,
        children: [
          {
            path: "thong-tin",
            element: <UserInfo />,
            index: true,
          },
          {
            path: "lich-su-thue-xe",
            element: <OrderHistory />,
            children: [
              {
                path: "",
                element: <OrderHistoryContent />,
                index: true,
              },
              {
                path: "chi-tiet",
                element: <OrderInfomation />,
              },
            ],
          },
        ],
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
        path: "that-bai",
        element: <OrderFail />,
      },
    ],
  },
  {
    path: "login/admin",
    element: <AdminLoginPage />,
    loader: () => {
      const admin = JWTService.decode(localStorage.getItem("jwt_admin"));
      if (admin) {
        return <AdminHome />;
      } else {
        return <AdminLoginPage />;
      }
    },
  },
  {
    path: "/settings",
    element: <SettingPage />,
    children: [
      {
        path: "",
        element: <DescriptionSetting />,
        index: true,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "xuat-hoa-don",
        element: <RentalCompletion />,
      },
      {
        path: "product",
        element: <ProductPage />,
        children: [
          {
            path: "",
            element: <ProductContent />,
            index: true,
          },
          {
            path: "cap-nhat-xe",
            element: <UpdateProductPage />,
          },
        ],
      },
      {
        path: "bao-cao",
        element: <ReportPage />,
      },
      {
        path: "danh-sach-don-thue-xe",
        element: <OrderListPage />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
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
