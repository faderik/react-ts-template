import { Sidebar } from "@/components/sidebar";

import ReactIcon from "@/assets/react.svg?react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Sidebar />
      <ReactIcon />
    </div>
  );
};

export default HomePage;
