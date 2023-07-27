import { setSideBarClose } from "@/redux/GeneralSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="main-container">
        <Navbar />
        <main className="main-page-layout" onClick={() => dispatch(setSideBarClose())}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
