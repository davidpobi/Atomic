import React from "react";
import { Fade, Icon, Paper, Popper, Typography } from "@mui/material";

interface ToastProps {
  openState: boolean;
  message: string;
  hasIcon: boolean;
  iconName?: string;
  anchorRef?: any;
  placement: any;
  classes?: string;
  positionTop?: string | {};
  positionLeft?: string | {};
}

const Toast = ({
  openState,
  message,
  hasIcon,
  iconName,
  anchorRef,
  placement,
  classes,
  positionTop,
  positionLeft,
}: ToastProps) => {
  return (
    <React.Fragment>
      <Popper
        open={openState}
        anchorEl={anchorRef.current}
        placement={placement || "auto"}
        className={classes}
        sx={{
          opacity: 0.7,
        }}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              className="popper-body"
              sx={{
                position: "relative",
                top: positionTop,
                left: positionLeft,
                backgroundColor: "white",
                border: "2px solid #b1b1b1",
                borderRadius: "10px",
                opacity: 0.7,
                width: {
                  xs: "170px",
                  sm: "170px",
                  md: "200px",
                  lg: "200px",
                  xl: "210px",
                },
                height: {
                  xs: "42px",
                  sm: "42px",
                  md: "52px",
                  lg: "52px",
                  xl: "52px",
                },
              }}
            >
              <Typography
                className="popper-message"
                sx={{
                  color: "#808080",
                  position: "relative",
                  top: "50%",
                  transform: "translate(0%,-50%)",
                  textAlign: "center",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "15px",
                    lg: "15px",
                    xl: "15px",
                  },
                }}
              >
                {hasIcon ? (
                  <Icon
                    className="popper-icon"
                    sx={{
                      position: "relative",
                      top: {
                        xs: "3px",
                        sm: "3px",
                        md: "3px",
                        lg: "3px",
                        xl: "3px",
                      },
                      left: {
                        xs: "-5px",
                        sm: "-5px",
                        md: "-6px",
                        lg: "-5px",
                        xl: "-5px",
                      },
                      fontSize: {
                        xs: "15px",
                        sm: "15px",
                        md: "16px",
                        lg: "16px",
                        xl: "16px",
                      },
                    }}
                  >
                    {iconName}
                  </Icon>
                ) : (
                  <></>
                )}
                {message}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default Toast;
