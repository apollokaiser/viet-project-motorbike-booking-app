import Header from "./Header";
import Footer from "./Footer";
import Navbar from "@comps/static/Navbar";
import { Outlet } from "react-router-dom";
function Page() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Page;
