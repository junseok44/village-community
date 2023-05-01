import React from "react";

const PlaceCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-back">{children}</div>
  );
};

export default PlaceCenter;
