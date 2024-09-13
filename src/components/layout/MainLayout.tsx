import { Outlet } from "react-router-dom";

import MainContainer from "../container/MainContainer";
import Navbar from "../shared/navbar/Navbar";

const MainLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </MainContainer>
  );
};

export default MainLayout;
