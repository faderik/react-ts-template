import { Suspense } from "react";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full h-full flex items-center justify-center">
        {<Outlet />}
      </div>
    </Suspense>
  );
};
