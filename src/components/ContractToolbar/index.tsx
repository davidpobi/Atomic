import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ContractDetails from "../../components/ContractDetails";
import LoopIcon from "@mui/icons-material/Loop";
import { IContract } from "../../interfaces/contracts";

const toolbar = {
  backgroundColor: "white",
  position: "relative",
  top: "-12px",
  width: "100%",
  height: "50px",
  padding: {
    xs: "0 10px",
    sm: "0 0rem",
    md: "0 0rem",
    xl: "0 1rem",
  },
};

const buttonStyle = {
  display: {
    xs: "none",
    sm: "none",
    md: "none",
    xl: "flex",
  },
  position: "absolute",
  top: "15px",
  right: "25px",
  backgroundColor: "white",
  color: "rgb(146, 145, 145)",
  border: "2px solid grey",
  borderRadius: "15px",
  width: "192px",
  height: "45px",
  ".icon": {
    position: "relative",
    left: "-6px",
  },
  ".txt": {
    position: "relative",
    left: "4px",
    fontFamily: "Kantumruy Pro",
    fontWeight: 400,
    letterSpacing: "1px",
    fontSize: {
      xs: "13px",
      md: "12px",
    },
  },
  ":hover": {
    color: "rgb(146, 145, 145)",
    backgroundColor: "white",
    border: "2px solid #ababab",
  },
  ":active": {
    color: "rgb(146, 145, 145)",
    backgroundColor: "white",
    border: "2px solid #ababab",
  },
};

interface ContractToolbarProps {
  contract: IContract;
  toggleSearchBoxCallback: () => void;
}

const ContractToolbar = ({ contract, toggleSearchBoxCallback }: ContractToolbarProps) => {
  const handleToggleSearchBox = () => {
    toggleSearchBoxCallback();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          ...toolbar,
          marginBottom: {
            xs: "0px",
            md: "20px",
            xl: "20px",
          },
        }}
      >
        <ContractDetails contract={contract} />

        <Button onClick={handleToggleSearchBox} variant="contained" sx={{ ...buttonStyle }}>
          <LoopIcon className="icon" />
          <span className="txt">New Collection</span>
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ContractToolbar;
