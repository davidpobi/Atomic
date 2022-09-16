import { Box } from "@mui/material";
import React, { createRef, useEffect } from "react";
import styles from "./styles.module.scss";

interface PageBodyProps {
  children: any;
  scrollPage?: boolean;
}

const PageBody = ({ children, scrollPage }: PageBodyProps) => {
  const anchorRef = createRef<any>();

  useEffect(() => {
    const scrollToTop = () => {
      anchorRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    if (!scrollPage) {
      return;
    }
    scrollToTop();
  }, [scrollPage, anchorRef]);

  return (
    <Box
      component={"div"}
      ref={anchorRef}
      className={styles.main}
      sx={{
        position: "relative",
        margin: 0,
        padding: {
          xs: "10px 0px",
          sm: "10px 1rem",
          md: "10px 1rem",
          xl: "10px 7rem",
        },
        overflowY: "scroll",
        scrollBehavior: "smooth",
      }}
    >
      {children}
    </Box>
  );
};

export default PageBody;
