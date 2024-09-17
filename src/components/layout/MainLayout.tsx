import { Outlet } from "react-router-dom";

import MainContainer from "../container/MainContainer";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const MainLayout = () => {
  return (
    <MainContainer>
      <div
        className="sticky top-0 z-[200] bg-white "
        style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
      >
        <Navbar />
      </div>
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        <Outlet />
      </div>
      <Footer />
    </MainContainer>
  );
};

export default MainLayout;
