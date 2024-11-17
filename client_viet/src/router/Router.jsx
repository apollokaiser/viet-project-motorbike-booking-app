import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "../layouts/ProductDetail.jsx";
import AddBikes from "../layouts/AddBikes.jsx";
import Page from "../layouts/Page.jsx";
import Home from "../layouts/Home.jsx";
import SearchResult from "../layouts/SearchResult.jsx";
import Cart from "@comps/cart/Cart.jsx";


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
        },
        {
          path:'/tim-kiem',
          element: <SearchResult/>
        },
        {
          path:"/gio-hang",
          element:<Cart/>
        }
      ],
    },
  ]);
function Router({children}) {
    return (<>
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    </>)
}

export default Router;