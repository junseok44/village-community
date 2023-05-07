import React from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="mx-auto w-4/6 min-h-content pt-4 pb-44 max-h-200vh">
      {children}
    </div>
  );
};

export default Layout;
