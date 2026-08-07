import { alpha, createTheme } from "@mui/material/styles";

const brand = {
  green: "#2e7d32",
  greenDark: "#1b5e20",
  amber: "#FBD062",
  black: "#0b0f17",
};

const common = {
  palette: {
    primary: {
      main: brand.green,
      yellow: brand.amber,
      green: "#7AB259",
      green2: "#A7D18E",
      headline: "#333332",
      para: "#626262",
      back: "rgba(122, 178, 89, 0.15)",
    },
    secondary: {
      main: brand.amber,
    },
    success: {
      main: brand.green,
      dark: brand.greenDark,
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#dc2626",
    },
    info: {
      main: "#0284c7",
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 800, letterSpacing: "-0.01em" },
    h4: { fontWeight: 800, letterSpacing: "-0.01em" },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 700 },
  },
};

export const getAppTheme = (mode = "light") =>
  createTheme({
    ...common,
    palette: {
      ...common.palette,
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#0b1020",
              paper: "#111827",
            },
            text: {
              primary: "#e5e7eb",
              secondary: "#94a3b8",
            },
            divider: alpha("#e5e7eb", 0.12),
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#ffffff",
            },
            text: {
              primary: "#0f172a",
              secondary: "#475569",
            },
            divider: alpha("#0f172a", 0.12),
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*, *::before, *::after": { boxSizing: "border-box" },
          body: { margin: 0 },
          a: { color: "inherit" },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 0,
            paddingInline: 18,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 0,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            border: "1px solid",
            borderColor: theme.palette.divider,
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
