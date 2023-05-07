import React from "react";

const PlaceCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center pt-40">{children}</div>
  );
};

export default PlaceCenter;
