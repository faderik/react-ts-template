import { Suspense } from "react";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>{<Outlet />}</div>
    </Suspense>
  );
};
