import "../../styles/navbar.style.css";
import { Divide as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { generateNavbarItems } from "../../utils/route.utils";
import { commonRouterNavbarItems } from "../../constant/routes.constant";
import { MdLogin } from "react-icons/md";

const Navbar = () => {
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const navbarItems = generateNavbarItems(commonRouterNavbarItems);

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef?.current?.contains(e?.target as Node)
      ) {
        setDropDownState(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-gray py-2 text-black-600 ">
      {/* Logo */}
      <NavLink to={""}>
        <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 font-semibold text-black-700 transition-all duration-200 hover:scale-110">
          <h2 className="font-bold flex items-center justify-center ">
            <span className="text-2xl text-common-700">Q.</span>
            <span className="text-xl">Meet</span>
          </h2>
        </div>
      </NavLink>

      {/* Center all navigation panel */}
      <div>
        <ul className="hidden items-center justify-between gap-2 md:flex font-medium navbar-items ">
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
          <NavLink to={"/login"} className="cursor-pointer ml-3">
            <MdLogin size={25} className="hover:text-common-700 duration-100" />
          </NavLink>
        </ul>
      </div>

      {/* Cart Icon + Mini window hamburger */}
      <div className="flex md:hidden items-center justify-center  pr-2">
        {/* Hamburger menu & toggle bar that will open in short window */}
        <div
          className="relative flex transition-transform md:hidden"
          ref={dropDownMenuRef}
        >
          <span>
            <Hamburger
              size={18}
              toggled={dropDownState}
              toggle={setDropDownState}
            />
          </span>

          {dropDownState && (
            <ul className="z-10 bg-common-100/40  absolute -right-2 top-14 flex w-[200px] flex-col  rounded-bl-xl text-base navbar-items1 ">
              {navbarItems?.map((item, idx) => (
                <NavLink
                  to={item.to}
                  className={`cursor-pointer px-6 py-2 text-gray-600 font-semibold  duration-100 hover:bg-common-400/20`}
                  key={idx}
                  onClick={() => setDropDownState(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
