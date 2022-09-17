import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import CustomAvatar from "../../components/Avatar";
import EthLogo from "/public/images/eth-logo.svg";

const textStyle = {
  fontFamily: "Kantumruy Pro",
  ".logo": {
    position: "relative",
    color: "#747474",
    fontWeight: {
      sm: 400,
      md: 500,
    },
    letterSpacing: "0px",
    textDecoration: "none",
    fontSize: {
      xs: "30px",
      sm: "30px",
      md: "45px",
      xl: "45px",
    },
  },
  ".nav-link": {
    my: 2,
    display: "block",
    color: "#b1b1b1",
  },
};

const GeneralNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          padding: {
            xs: "0 10px",
            sm: "0 1rem",
            md: "0 3rem",
            xl: "0 10rem",
          },
        }}
      >
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" sx={textStyle}>
            <Link href="/">
              <span className="logo">Atomic</span>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  backgroundColor: "#eeeeee",
                  border: "2px solid #959595",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(0%,-50%)",
                  fontSize: "21px",
                  right: {
                    xs: "0px",
                    sm: "10px",
                    md: "10px",
                    xl: "10px",
                  },
                  width: {
                    xs: "38px",
                    sm: "45px",
                    md: "50px",
                  },
                }}
              >
                <CustomAvatar imgUrl={EthLogo} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default GeneralNavBar;
