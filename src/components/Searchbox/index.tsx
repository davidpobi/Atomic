import React from "react";
import { Box, Fab } from "@mui/material";
import RocketIcon from "@mui/icons-material/Rocket";

const searchbox = {
  position: "relative",
  top: {
    sm: "-5px",
    md: "10px",
  },
  width: "100%",
  height: "50px",
  marginBottom: {
    xs: "0px",
    sm: "0px",
    md: "25px",
  },
  display: "flex",
  ".addressInput": {
    position: "absolute",
    top: "0px",
    left: {
      xs: "2%",
      sm: "0%",
      xl: "20px",
    },
    width: {
      xs: "82%",
      sm: "91%",
      md: "92%",
      lg: "94%",
      xl: "calc(100% - 40px)",
    },
    height: "40px",
    borderRadius: "15px",
    border: " 2px solid grey",
    backgroundColor: "transparent",
  },
  ".addressInput::placeholder": {
    position: "relative",
    left: "25px",
  },
  ".fetchBtn": {
    position: "absolute",
    top: {
      xs: "-1px",
      sm: "-3px",
      md: "-3px",
    },
    right: {
      xs: "10px",
      md: "10px",
    },
    width: {
      xs: "40px",
      sm: "45px",
      md: "45px",
      lg: "46px",
    },
    height: {
      xs: "40px",
      sm: "45px",
      md: "45px",
      lg: "46px",
    },
    display: {
      xl: "none",
    },
    backgroundColor: "white",
    opacity: 0.7,
    border: "3px solid rgb(231, 231, 231)",
  },
  ".fetch": {
    border: "3px solid teal",
  },
};

const SearchBox = () => {
  return (
    <React.Fragment>
      <Box sx={{ ...searchbox }}>
        <input type="text" placeholder="enter contract address... 0x320b3cc84afef86d7" className="addressInput" />

        <Fab className="fetchBtn">
          <RocketIcon className="icon" />
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default SearchBox;
