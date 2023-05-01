import { Box } from "@mui/material";
import React from "react";

const ButtonController = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      gap={"0.5rem"}
      sx={{
        width: "100%",
        display: "flex",
        marginTop: "1rem",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </Box>
  );
};

export default ButtonController;
