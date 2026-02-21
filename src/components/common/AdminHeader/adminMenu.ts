import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Bookings",
    newTab: false,
    path: "/admin/bookings",
  },
  {
    id: 3,
    title: "Calendar",
    newTab: false,
    path: "/admin/calendar-availability",
  },
  {
    id: 4,
    title: "Package",
    newTab: false,
    path: "/admin/packages/",
    submenu: [
      {
        id: 41,
      title: "View All Packages",
      newTab: false,
      path: "/admin/packages/",
      },
      {
        id: 42,
      title: "Add Package",
      newTab: false,
      path: "/admin/packages/add",
      },
    ],
  },
  
  {
    id: 5,
    title: "Room Settings",
    newTab: false,
    path: "/admin/room",
  },
  {
    id: 6,
    title: "Messages",
    newTab: false,
    path: "/admin/messages",
  },
  
];
