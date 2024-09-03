import { TNavbarItems, TNavbarRoutes, TRoutes } from "../types";

export const generateNavbarItems = (navbarItems: TNavbarRoutes[]) => {
  const navbar = navbarItems.reduce((acc: TNavbarItems[], item) => {
    if (item?.name && item?.path) {
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
