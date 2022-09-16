import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { IContract } from "../../interfaces/contracts";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const styles = {
  ".contractInfo": {
    display: "flex",
    position: "relative",
    width: {
      xs: "100%",
      xl: "70%",
    },
    fontSize: {
      xs: "28px",
      md: "48px",
    },
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  ".name": {
    position: "relative",
    top: {
      xs: "4px",
    },
    fontWeight: 900,
    fontFamily: "Kantumruy Pro",
    letterSpacing: "0px",
    color: "#808080",
    display: "flex",
    maxWidth: "110%",
    ".icon": {
      position: "relative",
      top: "50%",
      transform: "translate(0%,-50%)",
      left: {
        xs: "7px",
        md: "10px",
      },
      fontSize: {
        xs: "22px",
        md: "36px",
      },
    },
  },
  ".name_address": {
    textDecoration: "underline",
  },
  ".symbol": {
    position: "relative",
    top: {
      xs: "17px",
      sm: "16px",
      md: "27px",
      xl: "27px",
    },
    fontSize: {
      xs: "13px",
      md: "20px",
    },
    fontWeight: 700,
    color: "white",
    height: {
      xs: "20px",
      md: "30px",
      xl: "32px",
    },
    borderRadius: "5px",
  },
  ".token": {
    position: "relative",
    top: {
      xs: "20px",
      sm: "19px",
      md: "32px",
      xl: "30px",
    },
    ml: {
      xs: 2,
      md: 3,
    },
    backgroundColor: "transparent",
    fontSize: {
      xs: "9px",
      md: "14px",
      xl: "14px",
    },
    fontWeight: 200,
    color: "gray",
    height: {
      xs: "16px",
      md: "23px",
      xl: "27px",
    },
    width: {
      xs: "70px",
      md: "100px",
      xl: "100px",
    },
    borderRadius: "5px",
    border: "2px solid grey",
  },
};

interface ContractDetailsProps {
  contract: IContract;
}

const ContractDetails = ({ contract }: ContractDetailsProps) => {
  const [{ name, symbol, tokenType, totalSupply, address }, setContractData] = useState<IContract>({
    name: contract.name || "",
    symbol: contract.symbol || "",
    tokenType: contract.tokenType || "",
    totalSupply: contract.totalSupply || 0,
    address: contract.address,
  });

  useEffect(() => {
    setContractData({
      name: contract.name || "",
      symbol: contract.symbol || "",
      tokenType: contract.tokenType || "",
      totalSupply: contract.totalSupply || 0,
      address: contract.address,
    });
  }, [contract]);

  return (
    <React.Fragment>
      <Box sx={{ ...styles }}>
        <Typography
          component={"div"}
          className="contractInfo"
          sx={{
            ".name": {
              overflowX: {
                xs: `${name.length > 35 ? "auto" : ""}`,
              },
              overflowY: {
                xs: `${name.length > 35 ? "hidden" : ""}`,
              },
              whiteSpace: {
                xs: `${name.length > 35 ? "nowrap" : ""}`,
              },
            },
            ".symbol": {
              ml: {
                xs: name.length > 10 ? 2 : 2,
                md: 4,
              },
            },
          }}
        >
          {name.length > 0 ? (
            <span className="name">{name}</span>
          ) : (
            <span className="name name_address">
              {address?.slice(0, 12)} <OpenInNewIcon className="icon" />
            </span>
          )}

          {symbol.length > 0 ? <Chip label={symbol} className="symbol" /> : <></>}

          {tokenType.length > 0 ? <Chip label={tokenType} className="token" variant="outlined" /> : <></>}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default ContractDetails;
