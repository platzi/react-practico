import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Layout = ({ children }) => {
  let theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#00ab55",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ACD9B2",
      },
      error: {
        main: "#f44336",
      },
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: "small",
      },
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiTooltip: {
        arrow: true,
      },
      MuiButton: {
        size: "small",
      },
      MuiButtonGroup: {
        size: "small",
      },
      MuiCheckbox: {
        size: "small",
      },
      MuiFab: {
        size: "small",
      },
      MuiFormControl: {
        margin: "dense",
        size: "small",
      },
      MuiFormHelperText: {
        margin: "dense",
      },
      MuiIconButton: {
        size: "small",
      },
      MuiInputBase: {
        margin: "dense",
      },
      MuiInputLabel: {
        margin: "dense",
      },
      MuiRadio: {
        size: "small",
      },
      MuiSwitch: {
        size: "small",
      },
      MuiTextField: {
        margin: "dense",
        size: "small",
      },
    },
    shape: {
      borderRadius: 4,
    },
    direction: "rtl",
    spacing: 8,
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="Layout">{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
