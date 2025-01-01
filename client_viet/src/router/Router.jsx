import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Admin
import AdminLoginPage from "@/pages/admin/Login/AdminLoginPage.jsx";
import AdminHome from "../pages/admin/Home/Home.jsx";
//Web (user)
import ProductDetail from "../pages/web/Product/ProductDetailPage.jsx";
import SearchPage from "../pages/web/Search/SearchResult.jsx";
import OrderSuccess from "@comps/payment/OrderSuccess.jsx";
import OrderStatus from "@pages/web/Order/OrderStatus.jsx";
import UserPage from "@pages/web/Profile/UserPage.jsx";
import OrderFail from "@comps/payment/OrderFail.jsx";
import HomePage from "../pages/web/Home/HomePage.jsx";
//layouts
import AdminPage from "@/layouts/admin/Page.jsx";
import Page from "@/layouts/web/Page.jsx";

import ProductPage from "@pages/admin/Product/ProductPage.jsx";
import ProductContent from "@comps/admin/product/ProductContent.jsx";
import ProductService from "@/services/ProductService.js";
import NotFound from "@pages/error/NotFound.jsx";
import Unauthorized from "@pages/error/Unauthorized.jsx";
import JWTService from "@/services/JWTService.js";
import CartPage from "@pages/web/Cart/CartPage.jsx";
import UpdateProductPage from "@pages/admin/Product/UpdateProductPage.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Page />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/chi-tiet-xe/:id",
        element: <ProductDetail />,
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
        path: "/gio-hang",
        element: <CartPage />,
      },
      {
        path:"/thong-tin-khach-hang",
        element:<UserPage />
      }
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
  }, {
    path:"login/admin",
    element:<AdminLoginPage />,
    loader: () =>{
      const admin = JWTService.decode(localStorage.getItem("jwt_admin"));
      if (admin) {
        return <AdminHome />;
      } else {
        return <AdminLoginPage />;
      }
    }
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children:[
      {
        path:"",
        element:<AdminHome />
      },
      {
        path:"product",
        element:<ProductPage />,
        children:[
          {
            path:"",
            element:<ProductContent />,
            index: true,
          },
          {
            path:"cap-nhat-xe",
            element:<UpdateProductPage />
          }
        ]
      }
    ]
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
function Router({ children }) {
  return (
    <>
      <RouterProvider router={router}>{children}</RouterProvider>
    </>
  );
}

export default Router;
