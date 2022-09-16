import React, { useCallback, useEffect, useState } from "react";
import { Box, Fab } from "@mui/material";
import RocketIcon from "@mui/icons-material/Rocket";
import { validateEthereumAddress } from "../../utils/helpers";

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
    backgroundColor: "white",
    opacity: 0.7,
    border: "3px solid rgb(231, 231, 231)",
    display: {
      xl: "none",
    },
  },
  ".fetch": {
    border: "3px solid teal",
  },
};

interface SearchBoxProps {
  callSearch?: boolean;
  searchReadyCallback?: () => void;
  cancelSearchReadyCallback?: () => void;
  invalidContractCallback: () => void;
  isNoMatchState?: boolean; // true when component is used in NoMatch
}

const SearchBox = ({
  callSearch,
  searchReadyCallback,
  cancelSearchReadyCallback,
  invalidContractCallback,
  isNoMatchState,
}: SearchBoxProps) => {
  const [addressInput, setAddressInput] = useState("");

  const getNewCollection = useCallback(() => {
    if (!validateEthereumAddress(addressInput || "")) {
      invalidContractCallback();
      setAddressInput("");
      return;
    }
    window.open(window.location.origin + "/collection/" + addressInput, "_self");
  }, [addressInput, invalidContractCallback]);

  useEffect(() => {
    if (addressInput.length > 5) {
      searchReadyCallback && searchReadyCallback();
    } else {
      cancelSearchReadyCallback && cancelSearchReadyCallback();
    }
  }, [addressInput, searchReadyCallback, cancelSearchReadyCallback]);

  useEffect(() => {
    if (callSearch) {
      getNewCollection();
    }
  }, [callSearch, getNewCollection]);

  const checkAddress = (address: any) => {
    setAddressInput(address.trim());
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          ...searchbox,
          ".addressInput": {
            position: "absolute",
            top: "0px",
            left: {
              xs: "2%",
              sm: "0%",
              xl: "20px",
            },
            width: {
              xs: isNoMatchState ? "76%" : "82%",
              sm: isNoMatchState ? "82%" : "91%",
              md: isNoMatchState ? "84%" : "92%",
              lg: isNoMatchState ? "85%" : "94%",
              xl: "calc(100% - 40px)",
            },
            height: "40px",
            borderRadius: "15px",
            border: " 2px solid grey",
            backgroundColor: "transparent",
            padding: {
              xs: "0px 0px 0px 10px",
              md: "0px 0px 0px 25px",
            },
            color: "#808080",
            fontSize: {
              xs: "17px",
              md: "19px",
            },
          },
          ".addressInput::placeholder": {
            position: "relative",
            left: "0px",
            fontSize: {
              xs: "12px",
              md: "16px",
            },
          },
        }}
      >
        <input
          value={addressInput}
          onChange={(e) => checkAddress(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? getNewCollection() : null)}
          type="text"
          placeholder="enter contract address... 0x320b3cc84afef86d7"
          className="addressInput"
        />

        <Fab
          className={`fetchBtn ${addressInput.length > 5 ? "fetch" : ""}`}
          onClick={() => getNewCollection()}
          disabled={addressInput.length < 4}
        >
          <RocketIcon className="icon" />
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default SearchBox;
