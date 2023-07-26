import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="main-container">
        <Navbar />
        <main className="main-page-layout">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
