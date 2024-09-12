import {
  UserCircleIcon,
  UserIcon,
  BookmarkIcon,
  ClockIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

import { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const adminSidebarItems: MenuItem[] = [
  getItem(
    <Link to={"/dashboard/profile"}>Profile</Link>,
    "1",
    <UserCircleIcon />
  ),
  getItem(<Link to={"/dashboard"}>Dashboard</Link>, "2", <UserIcon />),
  getItem("Room Management", "3", <HomeIcon />, [
    getItem(<Link to={"/dashboard/create-room"}>Create Room</Link>, "4"),
    getItem(<Link to={"/dashboard/all-rooms"}>All Rooms</Link>, "5"),
  ]),
  getItem("Slots Management", "6", <ClockIcon />, [
    getItem(<Link to={"/dashboard/create-slots"}>Create Slots</Link>, "7"),
    getItem(<Link to={"/dashboard/all-slots"}>All Slots</Link>, "8"),
  ]),
  getItem(
    <Link to={"/dashboard/booking-management"}>Booking Management</Link>,
    "9",
    <BookmarkIcon />
  ),
];
