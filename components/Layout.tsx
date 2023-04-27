import React from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  return <div className="mx-auto w-4/6 min-h-500 mt-4">{children}</div>;
};

export default Layout;
