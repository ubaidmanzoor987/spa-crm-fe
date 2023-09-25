import Dashboard from "../../../../public/svgs/dashboard.svg";
import DashboardActive from "../../../../public/svgs/Dashboard-active.svg";
import Booking from "../../../../public/svgs/todo.svg";
import BookingActive from "../../../../public/svgs/booking-active.svg";
import Services from "../../../../public/svgs/board.svg";
import ServicesActive from "../../../../public/svgs/service-active.svg";
import Room from "../../../../public/svgs/cards.svg";
import RoomActive from "../../../../public/svgs/room-active.svg";
import Staff from "../../../../public/svgs/mail.svg";
import StaffActive from "../../../../public/svgs/staff-active.svg";
import Amenities from "../../../../public/svgs/tub.svg";
import AmenitiesActive from "../../../../public/svgs/aminity-active.svg";
import Product from "../../../../public/svgs/product-icon.svg";
import ProductActive from "../../../../public/svgs/product-active.svg";
import { SvgDiv } from "./sidebar.styles";
export const BRANCHITEM = [
  {
    title: "Dashboard",
    icon: (
      <SvgDiv>
        <Dashboard />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <DashboardActive />
      </SvgDiv>
    ),
    page: "dashboard",
    path: "/dashboard",
  },
  {
    title: "Booking",
    icon: (
      <SvgDiv>
        <Booking />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <BookingActive />
      </SvgDiv>
    ),
    page: "booking",
    path: "/booking",
  },
  {
    title: "Services",
    icon: (
      <SvgDiv>
        <Services />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <ServicesActive />
      </SvgDiv>
    ),
    page: "services",
    path: "/services",
  },
  {
    title: "Rooms",
    icon: (
      <SvgDiv>
        <Room />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <RoomActive />
      </SvgDiv>
    ),
    page: "rooms",
    path: "/rooms",
  },
  {
    title: "Amenities",
    icon: (
      <SvgDiv>
        <Amenities />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <AmenitiesActive />
      </SvgDiv>
    ),
    page: "amenities",
    path: "/amenities",
  },
  {
    title: "Staff",
    icon: (
      <SvgDiv>
        <Staff />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <StaffActive />
      </SvgDiv>
    ),
    page: "staff",
    path: "/staff",
  },
  {
    title: "Products",
    icon: (
      <SvgDiv>
        <Product />
      </SvgDiv>
    ),
    icon1: (
      <SvgDiv>
        <ProductActive />
      </SvgDiv>
    ),
    page: "product",
    path: "/product",
  },
];
