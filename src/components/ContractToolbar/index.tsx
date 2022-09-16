import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ContractDetails from "../../components/ContractDetails";
import LoopIcon from "@mui/icons-material/Loop";
import RocketIcon from "@mui/icons-material/Rocket";
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
  searchReady: boolean;
  runSearchCallback: () => void;
  toggleSearchBoxCallback: () => void;
}

const ContractToolbar = ({
  contract,
  searchReady,
  runSearchCallback,
  toggleSearchBoxCallback,
}: ContractToolbarProps) => {
  const [isSearchReady, setIsSearchReady] = useState(false);

  useEffect(() => {
    setIsSearchReady(searchReady);
  }, [searchReady]);

  const handleToggleSearchBox = () => {
    if (searchReady) {
      runSearchCallback();
      return;
    }
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

        <Button
          onClick={handleToggleSearchBox}
          variant="contained"
          sx={{ ...buttonStyle, border: isSearchReady ? "3px solid teal" : "3px solid grey" }}
        >
          {isSearchReady ? (
            <>
              <RocketIcon className="icon" />
              <span className="txt">Get Collection</span>
            </>
          ) : (
            <>
              <LoopIcon className="icon" />
              <span className="txt">New Collection</span>
            </>
          )}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ContractToolbar;
