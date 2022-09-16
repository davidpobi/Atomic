import React from "react";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";

const GeneralLayoutContainer = ({ children }: any) => {
  return (
    <Box
      className={styles.container}
      sx={{
        padding: {
          md: "0 2rem",
          xl: "0 2rem",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default GeneralLayoutContainer;
