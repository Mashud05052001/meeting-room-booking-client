import { TNavbarRoutes, TNavbarRoutesAllItemsExist } from "../types";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import AllMeetingRooms from "../pages/meetingRooms/AllMeetingRooms";
import MyBookings from "../pages/user/myBookings/MyBookings";
import SingleMeetingRoom from "../pages/user/singleMeetingRoomDetails/SingleMeetingRoomDetails";
import BookingForm from "../pages/user/bookingForm/BookingForm";
import Checkout from "../pages/payment/Checkout";
import ProtectedUserRoute from "../routes/ProtectedUserRoutes";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute";
import BookingManagement from "../pages/admin/bookingManagement/BookingManagement";
import Profile from "../pages/profile/Profile";
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
    { name:"Dashboard", path: "", element: <ProtectedAdminRoute><BookingManagement /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Room Management", path: "room-management", element: <ProtectedAdminRoute><Checkout /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Slot Management", path: "slots-management", element: <ProtectedAdminRoute><Checkout /></ProtectedAdminRoute> },
    // prettier-ignore
    { name:"Booking Management", path: "booking-management", element: <ProtectedAdminRoute><Checkout /></ProtectedAdminRoute> },
  ];

// prettier-ignore
export const adminDashboardNames = ["Profile", "Room Management", "Slot Management" ,"Booking Management"];
export const userDashboardNames = ["Profile", "My Bookings"];
export const adminNavbarNames = ["Profile", "Dashboard"];
export const userNavbarNames = [...userDashboardNames];
