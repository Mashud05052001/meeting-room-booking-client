import { Outlet } from "react-router-dom";
import MainContainer from "../container/MainContainer";

const DashboardLayout = () => {
  return (
    <MainContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </MainContainer>
  );
};

export default DashboardLayout;
