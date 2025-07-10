import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";

import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Loading } from "@/components/loading";

const NotFoundPage = lazy(() => import("@/pages/404"));
const HomePage = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/login"));

export const appRouter = createBrowserRouter([
  {
    element: <Suspense fallback={<Loading />}>{<Outlet />}</Suspense>,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: "/",
            Component: HomePage,
          },
          // ...add more here
        ],
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: "/login",
            Component: LoginPage,
          },
          // ...add more here
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
