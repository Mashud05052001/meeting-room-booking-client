import { routerNavbarItemsInDashboardLayout } from "../constant/routes.constant";
import { TNavbarItems, TNavbarRoutes, TRoutes } from "../types";

export const generateNavbarItems = (navbarItems: TNavbarRoutes[]) => {
  const navbar = navbarItems.reduce((acc: TNavbarItems[], item) => {
    if ((item?.name && item?.path) || item?.name === "Dashboard") {
      acc.push({
        name: item.name,
        to: item.path,
      });
    }
    return acc;
  }, []);
  return navbar;
};

export const generateRoutes = (routeItems: TNavbarRoutes[]) => {
  const routes = routeItems.reduce((acc: TRoutes[], item) => {
    if (item?.element && (item?.path === "" || item?.path)) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    return acc;
  }, []);
  return routes;
};

export const generateRouteItems = (itemNames: string[]) => {
  const routeItems = routerNavbarItemsInDashboardLayout.filter((item) => {
    for (const name of itemNames) {
      if (item.name === name) return item;
    }
  });
  return routeItems;
};
