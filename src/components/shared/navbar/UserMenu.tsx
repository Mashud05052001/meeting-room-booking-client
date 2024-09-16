import { useEffect, useRef, useState } from "react";
import useUserInfoFromToken from "../../../hook/useUserInfoFromToken";
import {
  generateNavbarItems,
  generateRouteItems,
} from "../../../utils/route.utils";
import {
  adminNavbarNames,
  userNavbarNames,
} from "../../../constant/routes.constant";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { logout } from "../../../redux/features/auth/auth.slice";
import { toast } from "sonner";
import { useGetUserQuery } from "@/redux/features/auth/auth.api";

const UserMenu = () => {
  const [openUserMenu, setOpenUserManu] = useState(false);
  const openUserMenuRef = useRef<HTMLDivElement>(null);
  const userInfo = useUserInfoFromToken();
  const dispatch = useAppDispatch();
  // const { data: allTodos, isLoading, isError, isSuccess } = useGetTodosQuery(priority, {pollingInterval: 1000, ....});
  const { data: userFullData } = useGetUserQuery({
    email: userInfo?.email as string,
  });
  const profilePicture = userFullData?.data?.profilePicture;

  const userImageText =
    userInfo?.role === "user" ? "U" : userInfo?.role === "admin" ? "A" : "S.A";

  let userMenuItems;
  if (userInfo?.role === "user")
    userMenuItems = generateNavbarItems(generateRouteItems(userNavbarNames));
  else
    userMenuItems = generateNavbarItems(generateRouteItems(adminNavbarNames));

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logout successfully ");
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
            {profilePicture ? (
              <div className="duration-200 hover:opacity-80 shadow-md">
                <img src={profilePicture} className="w-10 h-10 rounded-full" />
              </div>
            ) : (
              <div className="flex items-center justify-center text-white text-xl font-semibold size-10 rounded-full bg-slate-500 object-cover duration-200 hover:scale-x-[98%] hover:opacity-80 shadow-md">
                {userImageText}
              </div>
            )}
          </button>
          <div
            className={`${
              openUserMenu ? "visible duration-300" : "invisible"
            } absolute right-0 top-16 z-50 w-40 rounded-sm bg-slate-200 shadow-md font-medium flex flex-col`}
          >
            {userMenuItems?.map((item, idx) => (
              <Link
                to={`${item?.to ? `/dashboard/${item.to}` : "/dashboard"}`}
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
