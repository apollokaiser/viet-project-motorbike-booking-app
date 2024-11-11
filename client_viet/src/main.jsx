import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Page from './layouts/Page.jsx';
import Home from './layouts/Home.jsx';
import AddBikes from './layouts/AddBikes.jsx';
import ProductDetail from './layouts/ProductDetail.jsx';

  const router = createBrowserRouter([
    {
        path:"/",
        element: <Page/>,
        children:[
            {
                path:"",
                element:<Home/>,
                index:true,
            },
            {
              path:'/add-bikes',
              element:<AddBikes/>
            },
            {
              path:'/chi-tiet-xe/:id',
              element:<ProductDetail/>
            }
        ]
    }
  ])
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="482202498083-fs58mcjoc077uq2e3245farh44km8u6p.apps.googleusercontent.com">
   <RouterProvider router={router} />
  </GoogleOAuthProvider>
    
)
