import React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ArrowFwd from "@mui/icons-material/ArrowForward";
import ArrowBwd from "@mui/icons-material/ArrowBack";
import LoopIcon from "@mui/icons-material/Loop";
import FullcreenIcon from "@mui/icons-material/FullscreenOutlined";

interface ActionButtonsProps {
  nextPageCallback: () => void;
  previousPageCallback: () => void;
  toggleSearchBoxCallback: () => void;
  toggleFullscreenCallback?: () => void;
}

const ActionButtons = ({ nextPageCallback, previousPageCallback, toggleSearchBoxCallback }: ActionButtonsProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down("xl"), {
    noSsr: true,
  });

  const handleToggleSearchBoxCallback = () => {
    toggleSearchBoxCallback();
  };

  const handleNextPageCallback = () => {
    nextPageCallback();
  };

  const handlePrevPageCallback = () => {
    previousPageCallback();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "fixed",
          bottom: {
            xs: "5%",
            sm: "15%",
            md: "15%",
          },
          right: {
            xs: "5px",
            md: "15px",
          },
          "& > :not(style)": { my: 2, display: "block" },
          ".actionBtn": {
            backgroundColor: "white",
            width: {
              xs: "35px",
              md: "55px",
            },
            height: {
              xs: "35px",
              md: "55px",
            },
            border: "3px solid rgb(231, 231, 231)",
            display: "flex",
            boxShadow: "none",
            opacity: 0.5,
            ":hover": {
              color: "#FFFFF",
              backgroundColor: "white",
              border: "3px solid rgb(231, 231, 231)",
            },
            ":active": {
              color: "#FFFFF",
              backgroundColor: "white",
              border: "3px solid rgb(231, 231, 231)",
            },
            ":disabled": {
              color: "grey",
            },
            ".icon": {
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              fontSize: {
                xs: "15px",
                md: "21px",
              },
              color: "#3b3b3b",
            },
            ".pager": {
              fontSize: {
                xs: "8px",
                md: "12px",
              },
              color: "#3b3b3b",
            },
          },
        }}
      >
        <Fab className="actionBtn">
          <FullcreenIcon className="icon" />
        </Fab>
        {isDesktop ? (
          <Fab
            onClick={handleToggleSearchBoxCallback}
            className="actionBtn"
            sx={{
              display: "none",
            }}
          >
            <LoopIcon className="icon" />
          </Fab>
        ) : (
          <></>
        )}
        <Fab onClick={handleNextPageCallback} className="actionBtn">
          <ArrowFwd className="icon" />
        </Fab>
        <Fab onClick={handlePrevPageCallback} className="actionBtn">
          <ArrowBwd className="icon" />
        </Fab>
        <Fab className="actionBtn">
          <span className="pager">2/100</span>
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default ActionButtons;
