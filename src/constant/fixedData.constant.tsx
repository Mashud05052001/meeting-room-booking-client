import customerImg1 from "@/assets/customerPicture/cus1.jpg";
import customerImg2 from "@/assets/customerPicture/cus2.jpg";
import customerImg3 from "@/assets/customerPicture/cus3.jpg";
import manager from "@/assets/enployee/manager.jpg";
import designer1 from "@/assets/enployee/designer1.jpg";
import designer2 from "@/assets/enployee/designer2.jpg";
import developer1 from "@/assets/enployee/developer1.jpg";
import developer2 from "@/assets/enployee/developer2.jpg";
import developer3 from "@/assets/enployee/developer3.jpg";
import { InboxIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  FaRegClock,
  FaRegCalendarAlt,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

export const customerTestimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    profession: "Business Consultant",
    rating: "5.0",
    img: customerImg1,
    review:
      "QMeet has streamlined my meeting scheduling process. The rooms are always available, and the platform makes it easy to book on short notice.",
  },
  {
    id: 2,
    name: "Michael Davis",
    profession: "Tech Entrepreneur",
    rating: "4.8",
    img: customerImg2,
    review:
      "I love the flexibility QMeet provides. I can reserve a room for a quick meeting or an all-day workshop. It saves me time and effort!",
  },
  {
    id: 3,
    name: "Jessica Lee",
    profession: "HR Manager",
    rating: "4.9",
    img: customerImg3,
    review:
      "QMeet helped me organize our team meetings without any hassle. The platform is user-friendly and the spaces are always equipped with what we need.",
  },
];

export const companyNumberResult = [
  {
    id: 1,
    value: "300%",
    name: "Company Growth",
  },
  {
    id: 2,
    value: "65+",
    name: "Company Work",
  },
  {
    id: 3,
    value: "100K+",
    name: "Room Booking",
  },
];

export const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Manager", image: manager },
  { id: 2, name: "Marrie Leo", role: "Developer", image: designer1 },
  { id: 3, name: "Charlie Davis", role: "Developer", image: designer2 },
  { id: 4, name: "Diana Evans", role: "Developer", image: developer1 },
  { id: 5, name: "Ella Fisher", role: "Designer", image: developer2 },
  { id: 6, name: "Frank Green", role: "Designer", image: developer3 },
];

export const contactUsArray = [
  {
    id: 1,
    icon: () => <PhoneIcon className="size-6" />,
    title: "Phone",
    value: "(901) 324-3127",
  },
  {
    id: 2,
    icon: () => <InboxIcon className="size-6" />,
    title: "Email",
    value: "keyMach@official.com",
  },
  {
    id: 3,
    icon: () => <MapPinIcon className="size-6" />,
    title: "Address",
    value: "Fort Wainwright, Alaska(AK)",
  },
];

export const allHomeServices = [
  {
    id: 1,
    icon: () => <FaRegClock className="size-8 sm:size-10 " />,
    title: "Real Time Availability",
    subTitle: "Always up-to-date",
  },
  {
    id: 2,
    icon: () => <FaRegCalendarAlt className="size-8 sm:size-10 " />,
    title: "Flexible Scheduling",
    subTitle: "Book on your terms",
  },
  {
    id: 3,
    icon: () => <FaRegMoneyBillAlt className="size-8 sm:size-10 " />,
    title: "Instant Confirmation",
    subTitle: "Book in seconds",
  },
  {
    id: 4,
    icon: () => <RiCustomerService2Fill className="size-8 sm:size-10 " />,
    title: "24/7 Support",
    subTitle: "Help anytime, always",
  },
];
