import { TNavbarRoutes } from "../types";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import MeetingRoom from "../pages/meetingRoom/MeetingRoom";

export const commonRouterNavbarItems: TNavbarRoutes[] = [
  { name: "Home", path: "", element: <Home /> },
  { name: "Home", path: "home", element: <Home /> },
  { name: "Meeting Room", path: "meeting-room", element: <MeetingRoom /> },
  { name: "About Us", path: "about-us", element: <About /> },
  { name: "Contact Us", path: "contact-us", element: <Contact /> },
];
