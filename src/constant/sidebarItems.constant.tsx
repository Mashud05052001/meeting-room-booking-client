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
    "profile",
    <UserCircleIcon />
  ),
  getItem(<Link to={"/dashboard"}>Dashboard</Link>, "dashboard", <UserIcon />),
  getItem("Room Management", "3", <HomeIcon />, [
    getItem(
      <Link to={"/dashboard/create-room"}>Create Room</Link>,
      "create-room"
    ),
    getItem(<Link to={"/dashboard/all-rooms"}>All Rooms</Link>, "all-rooms"),
  ]),
  getItem("Slots Management", "6", <ClockIcon />, [
    getItem(
      <Link to={"/dashboard/create-slots"}>Create Slots</Link>,
      "create-slots"
    ),
    getItem(<Link to={"/dashboard/all-slots"}>All Slots</Link>, "all-slots"),
  ]),
  getItem(
    <Link to={"/dashboard/booking-management"}>Booking Management</Link>,
    "booking-management",
    <BookmarkIcon />
  ),
];

export const userSidebarItems: MenuItem[] = [
  getItem(
    <Link to={"/dashboard/profile"}>Profile</Link>,
    "profile",
    <UserCircleIcon />
  ),
  getItem(
    <Link to={"/dashboard/my-bookings"}>My Bookings</Link>,
    "my-bookings",
    <UserIcon />
  ),
];
