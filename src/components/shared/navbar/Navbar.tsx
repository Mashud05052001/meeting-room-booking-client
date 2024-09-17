import { MdLogin } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { commonRouterNavbarItemsInMainLayout } from "../../../constant/routes.constant";
import useUserInfoFromToken from "../../../hook/useUserInfoFromToken";
import "../../../styles/navbar.style.css";
import { generateNavbarItems } from "../../../utils/route.utils";
import MiniScreenNavbarMenu from "./MiniScreenNavbarMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const navbarItems = generateNavbarItems(commonRouterNavbarItemsInMainLayout);
  const userInfo = useUserInfoFromToken();

  return (
    <nav className="flex items-center justify-between  py-2 px-3 text-black-600 relative">
      {/* Logo */}
      <NavLink to={"/home"}>
        <div className="scale-100 cursor-pointer rounded-2xl  py-2 font-semibold text-black-700 transition-all duration-200 hover:scale-110">
          <h2 className="font-bold flex items-center justify-center ">
            <span className="text-2xl text-common-700">Q.</span>
            <span className="text-xl">Meet</span>
          </h2>
        </div>
      </NavLink>
      {/* Navigation panel */}
      <div className="flex">
        {/* Large screen navigation panal + login */}
        <div className="hidden items-center justify-between gap-2 md:flex font-medium navbar-items ">
          {navbarItems?.map((item, idx) => (
            <NavLink
              to={item.to}
              className="group flex  cursor-pointer flex-col relative"
              key={idx}
            >
              <span className="text-center hover:text-common-700 duration-100 p-2">
                {item.name}
              </span>
            </NavLink>
          ))}
          {!userInfo?.email && (
            <NavLink to={"/login"} className="cursor-pointer ml-3">
              <MdLogin
                size={25}
                className="hover:text-common-700 duration-100"
              />
            </NavLink>
          )}
        </div>
        {/*  Mini window hamburger */}
        <MiniScreenNavbarMenu />
        {/* Logout + dashboard/profile menu */}
        {userInfo && userInfo?.email && <UserMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
