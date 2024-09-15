import { Outlet } from "react-router-dom";

import MainContainer from "../container/MainContainer";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const MainLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        <Outlet />
      </div>
      <Footer />
    </MainContainer>
  );
};

export default MainLayout;
