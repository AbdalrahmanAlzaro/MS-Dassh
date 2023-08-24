import { useLocation } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <div className="flex items-center">
      <IconButton
        variant="text"
        color="blue-gray"
        className="grid xl:hidden"
        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
      >
        <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
      </IconButton>
    </div>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
