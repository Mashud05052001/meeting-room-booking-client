import { Outlet } from "react-router-dom";
import AntSidebar from "../antDesignComponents/sidebar/AntSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div>
        <AntSidebar />
      </div>
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 overflow-x-auto pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
