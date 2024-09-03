import { ReactNode } from "react";

export type TNavbarRoutes = {
  name?: string;
  path: string;
  element?: ReactNode;
};

export type TNavbarItems = {
  to: string;
  name: string;
};

export type TRoutes = {
  path: string;
  element?: ReactNode;
  children?: TRoutes[];
};
