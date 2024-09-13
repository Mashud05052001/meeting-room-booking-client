import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { commonRouterNavbarItemsInMainLayout } from "../../../constant/routes.constant";
import { generateNavbarItems } from "../../../utils/route.utils";

const MiniScreenNavbarMenu = () => {
  const [openNavbarMenu, setOpenNavbarMenu] = useState(false);
  const openNavbarMenuRef = useRef<HTMLDivElement>(null);
  const navbarItems = generateNavbarItems(commonRouterNavbarItemsInMainLayout);

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        openNavbarMenuRef.current &&
        !openNavbarMenuRef?.current?.contains(e?.target as Node)
      ) {
        setOpenNavbarMenu(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  return (
    <div className="flex md:hidden items-center justify-center pr-2">
      <div
        className="flex transition-transform md:hidden"
        ref={openNavbarMenuRef}
      >
        <span>
          <Hamburger
            size={18}
            toggled={openNavbarMenu}
            toggle={setOpenNavbarMenu}
          />
        </span>

        {
          <div
            className={`${
              openNavbarMenu ? "visible duration-300" : "invisible"
            } absolute right-0 top-16 z-50 w-40 rounded-sm bg-slate-200  flex flex-col shadow-md sm-navbar-items md:navbar-items font-medium`}
          >
            {navbarItems?.map((item, idx) => (
              <NavLink
                to={item.to}
                className={`rounded-sm px-6 py-2 hover:bg-slate-300 ${
                  openNavbarMenu ? "opacity-100 duration-200" : "opacity-0"
                }    
                    `}
                key={idx}
                onClick={() => setOpenNavbarMenu(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default MiniScreenNavbarMenu;
