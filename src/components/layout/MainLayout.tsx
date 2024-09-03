import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import MainContainer from "../container/MainContainer";

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
