import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../Searchbox";
import RocketIcon from "@mui/icons-material/Rocket";

const style = {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ".message": {
    position: "absolute",
    top: "25%",
    fontSize: {
      xs: "19px",
      sm: "32px",
      md: "42px",
    },
    color: "#808080",
  },
  ".searchbox": {
    position: "absolute",
    top: {
      xs: "34%",
      md: "33%",
      xl: "35%",
    },
    width: {
      xs: "70%",
      sm: "50%",
      md: "50%",
      lg: "50%",
      xl: "40%",
    },
  },
  ".getBtn": {
    position: "absolute",
    top: {
      md: "48%",
      xl: "44%",
    },
    backgroundColor: "white",
    color: "rgb(146, 145, 145)",
    borderRadius: "15px",
    display: {
      xs: "none",
      md: "none",
      xl: "block",
    },
    ".icon": {
      position: "relative",
      top: "5px",
      left: "-2px",
    },
    ":hover": {
      color: "rgb(146, 145, 145)",
      backgroundColor: "white",
      border: "3px solid #ababab",
    },
    ":active": {
      color: "rgb(146, 145, 145)",
      backgroundColor: "white",
      border: "3px solid #ababab",
    },
  },
};

interface NoMatchProps {
  invalidContractCallback: () => void;
}

const NoMatch = ({ invalidContractCallback }: NoMatchProps) => {
  const [callSearch, setCallSearch] = useState<boolean>(false);
  const [isSearchReady, setIsSearchReady] = useState<boolean>(false);

  const getNewCollection = () => {
    setCallSearch(!callSearch);
  };

  const handleInvalidContractCallback = () => {
    invalidContractCallback();
    setCallSearch(false);
  };

  const searchReadyCallback = () => {
    setIsSearchReady(true);
  };

  const cancelSearchReadyCallback = () => {
    setIsSearchReady(false);
  };

  return (
    <React.Fragment>
      <Box component={"div"} sx={{ ...style }}>
        <Typography className="message"> Invalid Contract Address. Try Again !</Typography>
        <Box component={"div"} className="searchbox">
          <SearchBox
            invalidContractCallback={handleInvalidContractCallback}
            searchReadyCallback={searchReadyCallback}
            cancelSearchReadyCallback={cancelSearchReadyCallback}
            callSearch={callSearch}
            isNoMatchState={true}
          />
        </Box>

        <Button
          onClick={getNewCollection}
          variant="contained"
          className="getBtn"
          sx={{ border: isSearchReady ? "3px solid teal" : "3px solid grey" }}
        >
          <RocketIcon className="icon" />
          <span className="txt">Get Collection</span>
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default NoMatch;
