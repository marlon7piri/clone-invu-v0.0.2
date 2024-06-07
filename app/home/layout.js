import React from "react";
import NavBarClient from "./NavBarClient";

const layout = ({ children }) => {
  return (
    <div className="">
      <NavBarClient />
      <div className="overflow-y-scroll">{children}</div>
    </div>
  );
};

export default layout;
