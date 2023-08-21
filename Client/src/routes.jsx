import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import Message from './pages/dashboard/Message'
import { SignIn, } from "@/pages/auth";
import Orders from './pages/dashboard/Orders';
import Product from './pages/dashboard/Product';

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Orders",
        path: "/Orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Product",
        path: "/Product",
        element: <Product />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Message",
        path: "/Message",
        element: <Message />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
