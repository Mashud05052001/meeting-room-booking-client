import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Profile from "../pages/profile/Profile";
import Checkout from "../pages/payment/Checkout";
import ProtectedRoute from "../routes/ProtectedRoute";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import MyBookings from "../pages/user/myBookings/MyBookings";
import AllSlots from "@/pages/admin/slotManagement/AllSlots";
import AllRooms from "@/pages/admin/roomManagement/AllRooms";
import ProtectedUserRoute from "../routes/ProtectedUserRoutes";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute";
import CreateRoom from "@/pages/admin/roomManagement/CreateRoom";
import CreateSlots from "@/pages/admin/slotManagement/CreateSlots";
import AllMeetingRooms from "../pages/meetingRooms/AllMeetingRooms";
import { TNavbarRoutes, TNavbarRoutesAllItemsExist } from "../types";
import BookingManagement from "../pages/admin/bookingManagement/BookingManagement";
import SingleMeetingRoom from "@/pages/user/singleMeetingRoom/SingleMeetingRoomDetails";
import ProtectedCheckout from "@/routes/ProtectedCheckout";

export const commonRouterNavbarItemsInMainLayout: TNavbarRoutes[] = [
  { name: "Home", path: "", element: <Home /> },
  { name: "Home", path: "home", element: <Home /> },
  { name: "Meeting Room", path: "meeting-room", element: <AllMeetingRooms /> },
  { name: "About Us", path: "about-us", element: <About /> },
  { name: "Contact Us", path: "contact-us", element: <Contact /> },
  // prettier-ignore
  { path: "meeting-room/:id", element: <ProtectedUserRoute> <SingleMeetingRoom /></ProtectedUserRoute> },
  // prettier-ignore
  // { path: "booking-form/:id", element: <ProtectedUserRoute><BookingForm /></ProtectedUserRoute> },
  // prettier-ignore
  { path: "checkout", element: <ProtectedCheckout><Checkout /></ProtectedCheckout> },
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
export const routerDashboardNames = ["Profile","My Bookings","Dashboard","Create Room", "All Rooms", "Room Management", "Create Slots", "All Slots" ,"Booking Management"];
export const userDashboardNames = ["Profile", "My Bookings"];
export const adminNavbarNames = ["Profile", "Dashboard"];
export const userNavbarNames = [...userDashboardNames];
