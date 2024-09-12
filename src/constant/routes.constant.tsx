import Dashboard from "@/pages/admin/dashboard/Dashboard";
import AllRooms from "@/pages/admin/roomManagement/AllRooms";
import CreateRoom from "@/pages/admin/roomManagement/CreateRoom";
import AllSlots from "@/pages/admin/slotManagement/AllSlots";
import CreateSlots from "@/pages/admin/slotManagement/CreateSlots";
import About from "../pages/about/About";
import BookingManagement from "../pages/admin/bookingManagement/BookingManagement";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import AllMeetingRooms from "../pages/meetingRooms/AllMeetingRooms";
import Checkout from "../pages/payment/Checkout";
import Profile from "../pages/profile/Profile";
import BookingForm from "../pages/user/bookingForm/BookingForm";
import MyBookings from "../pages/user/myBookings/MyBookings";
import SingleMeetingRoom from "../pages/user/singleMeetingRoomDetails/SingleMeetingRoomDetails";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProtectedUserRoute from "../routes/ProtectedUserRoutes";
import { TNavbarRoutes, TNavbarRoutesAllItemsExist } from "../types";

export const commonRouterNavbarItemsInMainLayout: TNavbarRoutes[] = [
  { name: "Home", path: "", element: <Home /> },
  { name: "Home", path: "home", element: <Home /> },
  { name: "Meeting Room", path: "meeting-room", element: <AllMeetingRooms /> },
  { name: "About Us", path: "about-us", element: <About /> },
  { name: "Contact Us", path: "contact-us", element: <Contact /> },
  // prettier-ignore
  { path: "meeting-room/:roomId", element: <ProtectedUserRoute> <SingleMeetingRoom /></ProtectedUserRoute> },
  // prettier-ignore
  { path: "booking-form", element: <ProtectedUserRoute><BookingForm /></ProtectedUserRoute> },
  // prettier-ignore
  { path: "checkout", element: <ProtectedUserRoute><Checkout /></ProtectedUserRoute> },
];

export const routerNavbarItemsInDashboardLayout: TNavbarRoutesAllItemsExist[] =
  [
    // prettier-ignore
    { name:"My Bookings", path: "my-bookings", element: <ProtectedUserRoute> <MyBookings /></ProtectedUserRoute> },
    // prettier-ignore
    { name:"Profile", path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
    // prettier-ignore
    { name:"Dashboard", path: "", element: <ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Create Room", path: "create-room", element: <ProtectedAdminRoute><CreateRoom /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"All Rooms", path: "all-rooms", element: <ProtectedAdminRoute><AllRooms /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Create Slots", path: "create-slots", element: <ProtectedAdminRoute><CreateSlots /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"All Slots", path: "all-slots", element: <ProtectedAdminRoute><AllSlots /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Booking Management", path: "booking-management", element: <ProtectedAdminRoute><BookingManagement /></ProtectedAdminRoute> },
  ];

// prettier-ignore
export const adminDashboardNames = ["Profile","Dashboard","Create Room", "All Rooms", "Room Management", "Create Slots", "All Slots" ,"Booking Management"];
export const userDashboardNames = ["Profile", "My Bookings"];
export const adminNavbarNames = ["Profile", "Dashboard"];
export const userNavbarNames = [...userDashboardNames];
