import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import "antd/dist/antd";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F4F7F6",
        color: "#163F35",
      },
    },
  },
  colors: {
    brand: {
      50: "#f6faeb",
      100: "#eaf5d1",
      200: "#dcf0b4",
      300: "#cceb95",
      400: "#bce676",
      500: "#bde56c", // Primary Lime Green
      600: "#9ebf58",
      700: "#7b9643",
      800: "#586c2d",
      900: "#344118",
    },
    darkGreen: {
      500: "#163F35",
      600: "#103129",
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "600",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "#163F35",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)",
            boxShadow: "sm",
          },
        },
        outline: {
          borderColor: "darkGreen.500",
          color: "darkGreen.500",
          _hover: {
            bg: "blackAlpha.50",
          }
        },
        dark: {
          bg: "darkGreen.500",
          color: "white",
          _hover: {
            bg: "darkGreen.600",
          }
        }
      },
      defaultProps: {
        colorScheme: "brand",
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "2xl",
          boxShadow: "sm",
          bg: "white",
          border: "none",
        }
      }
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
