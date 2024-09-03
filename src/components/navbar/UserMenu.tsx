import { useEffect, useRef, useState } from "react";
import useUserInfoFromToken from "../../hook/useUserInfoFromToken";
import {
  generateNavbarItems,
  generateRouteItems,
} from "../../utils/route.utils";
import {
  adminNavbarNames,
  userNavbarNames,
} from "../../constant/routes.constant";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/auth.slice";

const UserMenu = () => {
  const [openUserMenu, setOpenUserManu] = useState(false);
  const openUserMenuRef = useRef<HTMLDivElement>(null);
  const userInfo = useUserInfoFromToken();
  const dispatch = useAppDispatch();

  let userMenuItems;
  if (userInfo?.role === "user")
    userMenuItems = generateNavbarItems(generateRouteItems(userNavbarNames));
  else
    userMenuItems = generateNavbarItems(generateRouteItems(adminNavbarNames));

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        openUserMenuRef.current &&
        !openUserMenuRef?.current?.contains(e?.target as Node)
      ) {
        setOpenUserManu(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  return (
    <div>
      {userInfo && userInfo?.email && (
        <div ref={openUserMenuRef} className="h-10 md:ml-4 mr-3 2xl:mr-0">
          <button onClick={() => setOpenUserManu((prev) => !prev)}>
            <div className="flex items-center justify-center text-white text-xl font-semibold size-10 rounded-full bg-slate-500 object-cover duration-200 hover:scale-x-[98%] hover:opacity-80 shadow-md">
              P
            </div>
            {/* <img
              className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
              src="https://source.unsplash.com/300x300/?profile"
              alt="avatar"
            /> */}
          </button>
          <div
            className={`${
              openUserMenu ? "visible duration-300" : "invisible"
            } absolute right-0 top-16 z-50 w-40 rounded-sm bg-slate-200 shadow-md font-medium flex flex-col`}
          >
            {userMenuItems?.map((item, idx) => (
              //className={`rounded-sm px-6 py-2 cursor-pointer ${
              //  openUserMenu ? "opacity-100 duration-200" : "opacity-0"
              //}  `}
              //onClick={() => setOpenUserManu(false)}
              <Link
                to={`/dashboard/${item.to}`}
                key={idx}
                className="px-6 py-3 hover:bg-slate-300"
              >
                {item.name}
              </Link>
            ))}
            <div
              className="px-6 py-3 cursor-pointer text-red-500 hover:bg-red-600 hover:rounded-b-md hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
