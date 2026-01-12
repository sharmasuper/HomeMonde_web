import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <Navbar /> {/* always visible */}
      <Outlet /> {/* page content */}
      <Footer />
    </>
  );
}
export default AppLayout;
